import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Min } from 'class-validator';

export class AnalyseCorrectorDto {

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    argumentationScore: number;

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    vocabulaireScore: number;

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    traductionScore: number;

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    grammaireScore: number;

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    igScore: number;

    @IsNumber()
    @Min(0)
    @ApiModelProperty({ required: true })
    liensExterneScore: number;

}