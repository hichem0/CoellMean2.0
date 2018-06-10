import {Component, NotFoundException} from '@nestjs/common';
import Optional from 'typescript-optional';
import { Repository } from 'typeorm';
import { Exercice } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../group/group.entity';

@Component()
export class ExerciceService {

    constructor(
        @InjectRepository(Exercice)
        private readonly exerciseRepository: Repository<Exercice>,
    ) {}

    async createExerice(exo: Exercice): Promise<Exercice> {
        return this.exerciseRepository.save(exo);
    }

    async findAll(): Promise<Exercice[]> {
        return this.exerciseRepository.find();
    }

    async findById(id: number): Promise<Optional<Exercice>> {
        const exo = await this.exerciseRepository.findOne({ id });
        return Optional.ofNullable(exo);
    }

    async delete(exoId: number): Promise<void> {
        const exo = (await this.findById(exoId)).orElseThrow(() => new NotFoundException());
        await this.exerciseRepository.remove(exo);
    }
}