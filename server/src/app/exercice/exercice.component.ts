import {Component, NotFoundException} from '@nestjs/common';
import Optional from 'typescript-optional';
import { Repository } from 'typeorm';
import { Exercice } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../group/group.entity';
import {GroupService} from '../group/group.service';

@Component()
export class ExerciceService {

    constructor(
        @InjectRepository(Exercice)
        private readonly exerciseRepository: Repository<Exercice>,
        private readonly groupService: GroupService,
    ) {}

    async createExerice(exo: Exercice): Promise<Exercice> {
        return this.exerciseRepository.save(exo);
    }

    async findAll(): Promise<Exercice[]> {
        return this.exerciseRepository.find();
    }

    async findById(id: number): Promise<Optional<Exercice>> {
        const exo = await this.exerciseRepository.findOne({ id });
        // const exo = await this.exerciseRepository.findOne({ where: { id }, relations: ['']});
        return Optional.ofNullable(exo);
    }

    async delete(exoId: number): Promise<void> {
        const exo = (await this.findById(exoId)).orElseThrow(() => new NotFoundException());
        await this.exerciseRepository.remove(exo);
    }

    async linkToGroup(exoId: number, groupId: number): Promise<Exercice> {
        const group = (await this.groupService.findById(groupId)).orElseThrow(() => new NotFoundException());
        const exo = (await this.findById(exoId)).orElseThrow(() => new NotFoundException());
        group.exercices = [...group.exercices, exo].filter((x, i, a) => a.indexOf(x) === i);
        await this.groupService.save(group);
        return (await this.findById(exoId)).orElseThrow(() => new NotFoundException());
    }

    async unlinkToGroup(exoId: number, groupId: number): Promise<Exercice> {
        const group = (await this.groupService.findById(groupId)).orElseThrow(() => new NotFoundException());
        group.exercices = group.exercices.filter(x => x.id !== exoId);
        await this.groupService.save(group);
        return (await this.findById(exoId)).orElseThrow(() => new NotFoundException());

    }
}