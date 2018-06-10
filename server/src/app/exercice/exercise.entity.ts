import { DbAuditModel } from '../../util/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Analyse } from '../analyse/analyse.entity';
import {IsNumber, Min} from 'class-validator';

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
    publishDate: string;

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    source: string;

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    domain: string;

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    lang: string;

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    @Column('real')
    maxGradeVocab: number = 0;

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    @Column('real')
    maxGradeTrad: number = 0;

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    @Column('real')
    maxGradeGramar: number = 0;

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    @Column('real')
    maxGradeGlobalIdee: number = 0;

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    @Column('real')
    maxGradeArgumentation: number = 0;

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    @Column('real')
    maxGradeExternalLinks: number = 0;

    @ManyToOne(type => User, user => user.exerciceCreated, { eager: true })
    creator: User;

    @OneToMany(type => Analyse, analyse => analyse.exercice, { eager: true })
    resolutions: Analyse[];
}