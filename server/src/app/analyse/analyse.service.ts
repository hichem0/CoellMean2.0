import { Component, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analyse } from './analyse.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { AnalyseStudentDto } from '../dto/analyse.student.dto';
import { ExerciceService } from '../exercice/exercice.component';
import { Exercice } from '../exercice/exercise.entity';
import Optional from 'typescript-optional';
import { AnalyseCorrectorDto } from '../dto/analyse.corrector.dto';
import { WordPairService } from '../wordPair/wordPair.service';

@Component()
export class AnalyseService {

    constructor(
        @InjectRepository(Analyse)
        private readonly analyseRepository: Repository<Analyse>,
        private readonly exerciceService: ExerciceService,
        private readonly wordPairService: WordPairService,
    ) {}

    async findOneById(id): Promise<Optional<Analyse>> {
        return Optional.ofNullable(
            await this.analyseRepository.findOneById(id, { relations: ['exercice', 'exercice.creator'] }),
        );
    }

    async saveOrUpdateAnalyse(analyseDto: AnalyseStudentDto, user: User, idExo: number): Promise<Analyse> {
        const oldFromDb = await this.getAnalyseForUser(user, idExo);
        const analyse = this.analyseFromStudentDto(analyseDto, oldFromDb);
        return this.saveAnalyseStudent(analyse);
    }

    private async saveAnalyseStudent(analyse: Analyse): Promise<Analyse> {
        const vocabs = await this.wordPairService.saveAll(analyse.vocabulaire);
        const trads = await this.wordPairService.saveAll(analyse.tradution);
        const grammars = await this.wordPairService.saveAll(analyse.grammaire);

        analyse.vocabulaire = vocabs;
        analyse.tradution = trads;
        analyse.grammaire = grammars;

        return this.analyseRepository.save(analyse);
    }

    async gradeAnalyse(analyseDto: AnalyseCorrectorDto, user: User, idAnalyse: number): Promise<Analyse> {
        const analyse = (await this.findOneById(idAnalyse)).orElseThrow(() => new NotFoundException());
        if (analyse.exercice.creator.id !== user.id) {
            throw new UnauthorizedException('You are not the admin of the group');
        }

        return this.analyseRepository.save(this.analyseFromCorrectionDto(analyseDto, analyse));
    }

    async getAnalyseForUser(user: User, idExo: number): Promise<Analyse> {
        const exo = (await this.exerciceService.findById(idExo)).orElseThrow(() => new NotFoundException());

        const maybeAnalyse = await this.analyseRepository.findOne({ where: { user, exercice: exo } });

        return Optional.ofNullable(maybeAnalyse)
            .map((analyse) => {
                analyse.exercice = exo;
                return analyse;
            }).orElseGet(() => {
                const analyse = new Analyse();
                analyse.exercice = exo;
                analyse.user = user;
                return analyse;
            });
    }

    analyseFromStudentDto(analyseDto: AnalyseStudentDto, analyse: Analyse): Analyse {
        if (analyse.totalScore !== -1) {
            throw new UnauthorizedException('This analyse is already evaluated');
        }
        analyse.langue = analyseDto.langue;
        analyse.argumentation = analyseDto.argumentation;
        analyse.vocabulaire = analyseDto.vocabulaire;
        analyse.tradution = analyseDto.tradution;
        analyse.grammaire = analyseDto.grammaire;
        analyse.globalIdea = analyseDto.globalIdea;
        analyse.liensExterne = analyseDto.liensExterne;
        return analyse;
    }

    analyseFromCorrectionDto(analyseDto: AnalyseCorrectorDto, analyse: Analyse): Analyse {
        analyse.argumentationScore = Math.min(analyseDto.argumentationScore, analyse.exercice.maxGradeArgumentation);
        analyse.vocabulaireScore = Math.min(analyseDto.vocabulaireScore, analyse.exercice.maxGradeVocab);
        analyse.traductionScore = Math.min(analyseDto.traductionScore, analyse.exercice.maxGradeTrad);
        analyse.grammaireScore = Math.min(analyseDto.grammaireScore, analyse.exercice.maxGradeGramar);
        analyse.igScore = Math.min(analyseDto.igScore, analyse.exercice.maxGradeGlobalIdee);
        analyse.liensExterneScore = Math.min(analyseDto.liensExterneScore, analyse.exercice.maxGradeExternalLinks);
        analyse.totalScore = analyse.argumentationScore + analyse.vocabulaireScore + analyse.traductionScore + analyse.grammaireScore + analyse.igScore + analyse.liensExterneScore;
        return analyse;
    }
}