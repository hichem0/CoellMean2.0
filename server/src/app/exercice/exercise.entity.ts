import { DbAuditModel } from '../../util/dbmodel.model';
import { Column, Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

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

    @ApiModelProperty({ required: false })
    @Column('decimal')
    maxGradeVocab: number;

    @ApiModelProperty({ required: false })
    @Column('decimal')
    maxGradeTrad: number;

    @ApiModelProperty({ required: false })
    @Column('decimal')
    maxGradeGramar: number;

    @ApiModelProperty({ required: false })
    @Column('decimal')
    maxGradeArgumentation: number;

    @ApiModelProperty({ required: true })
    @Column({ array: true, type: 'text' })
    externalLinks: string[];

}