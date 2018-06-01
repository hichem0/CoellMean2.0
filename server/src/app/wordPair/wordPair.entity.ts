import { DbAuditModel } from '../../util/dbmodel.model';
import { Column, Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

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
}