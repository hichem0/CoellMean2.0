import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserUpdateDto {

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastName: string;

    @ApiModelProperty()
    @IsString()
    @Length(6, 40)
    @IsOptional()
    password: string;

}