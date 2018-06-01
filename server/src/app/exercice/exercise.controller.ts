import { ApiBearerAuth, ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ExerciceService } from './exercice.component';
import { Exercice } from './exercise.entity';
import { Group } from '../group/group.entity';

@ApiUseTags('Exo management')
@Controller('exo')
@ApiBearerAuth()
export class ExerciseController {

    constructor(
        private readonly exerciceService: ExerciceService,
    ) {}

    @Post()
    @ApiResponse({ status: 201, description: 'The exercice has been successfully created.', type: Exercice })
    async createExo(@Body() exo: Exercice): Promise<Exercice> {
        return this.exerciceService.createExerice(exo);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Get a list of all users.', type: Exercice, isArray: true })
    async findAll(): Promise<Exercice[]> {
        return this.exerciceService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'The group with the matching id', type: Exercice })
    @ApiResponse({ status: 404, description: 'Not found.' })
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async findOne(@Param() { id }): Promise<Exercice> {
        return (await this.exerciceService.findById(id)).orElseThrow(() => new NotFoundException());
    }

    @ApiResponse({ status: 200, description: 'The group is correctly deleted' })
    @Delete(':id')
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async deleteOne(@Param() { id }) {
        return this.exerciceService.delete(id);
    }
}