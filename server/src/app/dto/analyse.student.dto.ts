import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { WordPair } from '../wordPair/wordPair.entity';

export class AnalyseStudentDto {

    @ApiModelProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    langue: string;

    @ApiModelProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    argumentation: string;

    @IsArray()
    @ApiModelProperty({ required: true, type: WordPair, isArray: true})
    vocabulaire: WordPair[];

    @IsArray()
    @ApiModelProperty({ required: true, type: WordPair, isArray: true })
    tradution: WordPair[];

    @IsArray()
    @ApiModelProperty({ required: true, type: WordPair, isArray: true })
    grammaire: WordPair[];

    @IsArray()
    @ApiModelProperty({ required: true, isArray: true, type: String })
    globalIdea: string[];

    @IsArray()
    @ApiModelProperty({ required: true, isArray: true, type: String  })
    liensExterne: string[];

}