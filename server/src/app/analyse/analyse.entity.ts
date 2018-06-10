import { DbAuditModel } from '../../util/dbmodel.model';
import { User } from '../user/user.entity';
import { WordPair } from '../wordPair/wordPair.entity';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
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

    @ApiModelProperty({ required: true, type: WordPair, isArray: true })
    @OneToMany(type => WordPair, pair => pair.vocab, { eager: true })
    vocabulaire: WordPair[];

    @ApiModelProperty({ required: true, type: WordPair, isArray: true })
    @OneToMany(type => WordPair, pair => pair.trad, { eager: true })
    tradution: WordPair[];

    @ApiModelProperty({ required: true, type: WordPair, isArray: true })
    @OneToMany(type => WordPair, pair => pair.grammar, { eager: true })
    grammaire: WordPair[];

    @ApiModelProperty({ required: true })
    @Column('text', { isArray: true })
    globalIdea: string[];

    @ApiModelProperty({ required: true })
    @Column('text', { isArray: true })
    liensExterne: string[];

    @ApiModelProperty({ required: true })
    @Column('real')
    argumentationScore: number = 0;

    @ApiModelProperty({ required: true })
    @Column('real')
    vocabulaireScore: number = 0;

    @ApiModelProperty({ required: true })
    @Column('real')
    traductionScore: number = 0;

    @ApiModelProperty({ required: true })
    @Column('real')
    grammaireScore: number = 0;

    @ApiModelProperty({ required: true })
    @Column('real')
    igScore: number = 0;

    @ApiModelProperty({ required: true })
    @Column('real')
    liensExterneScore: number = 0;

    @ApiModelProperty({ required: false })
    @Column('real')
    totalScore: number = -1;

    @ManyToOne(type => User, user => user.analyses)
    user: User;
}