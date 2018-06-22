import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, Length } from 'class-validator';

export class GroupeCreateDto {

    @ApiModelProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    groupname: string;

}
