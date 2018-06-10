import { DbAuditModel } from '../../util/dbmodel.model';
import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import {User} from '../user/user.entity';

@Entity()
export class Exercice extends DbAuditModel {

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    title: string;

    @ApiModelProperty({ required: true })
    @Column('text')
    articleContenu: string;

    @ApiModelProperty({ required: false })
    @Column()
    publishDate: Date;

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    source: string;

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    domain: string;

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    lang: string;

    @ApiModelProperty({ required: true })
    @Column('decimal')
    maxGradeVocab: number;

    @ApiModelProperty({ required: true })
    @Column('decimal')
    maxGradeTrad: number;

    @ApiModelProperty({ required: true })
    @Column('decimal')
    maxGradeGramar: number;

    @ApiModelProperty({ required: true })
    @Column('decimal')
    maxGradeGlobalIdee: number;

    @ApiModelProperty({ required: true })
    @Column('decimal')
    maxGradeArgumentation: number;

    @ApiModelProperty({ required: true })
    @Column('decimal')
    maxGradeExternalLinks: number;

    @ManyToOne(type => User, user => user.exerciceCreated, { eager: true })
    creator: User;

}