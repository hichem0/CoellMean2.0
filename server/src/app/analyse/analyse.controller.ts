import { ApiBearerAuth, ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { AnalyseStudentDto } from '../dto/analyse.student.dto';
import { UserConnected } from '../../decorator/user.decorator';
import { Analyse } from './analyse.entity';
import { User } from '../user/user.entity';
import { AnalyseService } from './analyse.service';
import { AnalyseCorrectorDto } from '../dto/analyse.corrector.dto';

@ApiUseTags('Analyse management')
@Controller()
@ApiBearerAuth()
export class AnalyseController {

    constructor(
        private readonly analyseService: AnalyseService,
    ) {}

    @Post('exo/:idExo/answer')
    @ApiResponse({ status: 201, description: 'The current user\'s responce have been saved.', type: Analyse })
    @ApiResponse({ status: 404, description: 'The exercice was not found.', type: Analyse })
    @ApiImplicitParam({ type: Number, name: 'idExo', required: true })
    async answerToExo(@Body() analyse: AnalyseStudentDto, @UserConnected() user: User, @Param() { idExo }): Promise<Analyse> {
        return this.analyseService.saveOrUpdateAnalyse(analyse, user, idExo);
    }

    @Post('analyse/:id/grade')
    @ApiResponse({ status: 201, description: 'The grade have been saved.', type: Analyse })
    @ApiResponse({ status: 404, description: 'The exercice was not found.', type: Analyse })
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async gradeExo(@Body() analyse: AnalyseCorrectorDto, @UserConnected() user: User, @Param() { id }): Promise<Analyse> {
        return this.analyseService.gradeAnalyse(analyse, user, id);
    }

    @Get('analyse/:id')
    @ApiResponse({ status: 201, description: 'The current user\'s responce have been saved.', type: Analyse })
    @ApiResponse({ status: 404, description: 'The exercice was not found.', type: Analyse })
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async getById(@Param() { id }): Promise<Analyse> {
        return (await this.analyseService.findOneById(id)).orElseThrow(() => new NotFoundException());
    }

}