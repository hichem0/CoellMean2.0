import {InjectRepository} from '@nestjs/typeorm';
import {WordPair} from './wordPair.entity';
import {Repository} from 'typeorm';
import {Component} from '@nestjs/common';

@Component()
export class WordPairService {
    constructor(
        @InjectRepository(WordPair)
        private readonly wordPairRepository: Repository<WordPair>,
    ) {}

    async saveAll(wordPairs: WordPair[]): Promise<WordPair[]> {
        return this.wordPairRepository.save(wordPairs);
    }
}