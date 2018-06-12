import { DbAuditModel } from '../../util/dbmodel.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Analyse } from '../analyse/analyse.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class WordPair extends DbAuditModel {

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    @IsString()
    @IsNotEmpty()
    key: string;

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    @IsString()
    @IsNotEmpty()
    value: string;

    @Exclude()
    @ManyToOne(type => Analyse, analise => analise.vocabulaire, { cascadeRemove: true, cascadeAll: true })
    vocab: Analyse;

    @Exclude()
    @ManyToOne(type => Analyse, analise => analise.tradution, { cascadeRemove: true, cascadeAll: true })
    trad: Analyse;

    @Exclude()
    @ManyToOne(type => Analyse, analise => analise.grammaire, { cascadeRemove: true, cascadeAll: true })
    grammar: Analyse;
}