import { DbAuditModel } from '../../util/dbmodel.model';
import { User } from '../user/user.entity';
import { WordPair } from '../wordPair/wordPair.entity';
import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exercice } from '../exercice/exercise.entity';

@Entity()
export class Analyse extends DbAuditModel {

    @ManyToOne(type => Exercice, exo => exo.resolutions)
    exercice: Exercice;

    @ApiModelProperty({ required: true })
    @Column('text')
    langue: string;

    @ApiModelProperty({ required: true })
    @Column('text')
    argumentation: string;

    @OneToMany(type => WordPair, pair => pair.vocab, { cascadeInsert: true, cascadeUpdate: true, eager: true })
    vocabulaire: WordPair[];

    @OneToMany(type => WordPair, pair => pair.trad, { cascadeInsert: true, cascadeUpdate: true, eager: true })
    tradution: WordPair[];

    @OneToMany(type => WordPair, pair => pair.grammar, { cascadeInsert: true, cascadeUpdate: true, eager: true })
    grammaire: WordPair[];

    @ApiModelProperty({ required: true })
    @Column('text', { isArray: true })
    globalIdea: string[];

    @ApiModelProperty({ required: true })
    @Column('text', { isArray: true })
    liensExterne: string[];

    @ApiModelProperty({ required: true })
    @Column('decimal')
    argumentationScore: number;

    @ApiModelProperty({ required: true })
    @Column('decimal')
    vocabulaireScore: number;

    @ApiModelProperty({ required: true })
    @Column('decimal')
    traductionScore: number;

    @ApiModelProperty({ required: true })
    @Column('decimal')
    grammaireScore: number;

    @ApiModelProperty({ required: true })
    @Column('decimal')
    igScore: number;

    @ApiModelProperty({ required: true })
    @Column('decimal')
    liensExterneScore: number;

    @ApiModelProperty({ required: false })
    @Column('decimal')
    totalScore: number;

    @ManyToOne(type => User, user => user.analyses)
    user: User;
}