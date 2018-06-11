import { ApiBearerAuth, ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import {Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post} from '@nestjs/common';
import { ExerciceService } from './exercice.component';
import { Exercice } from './exercise.entity';
import { Group } from '../group/group.entity';
import {User} from '../user/user.entity';
import {UserConnected} from '../../decorator/user.decorator';

@ApiUseTags('Exo management')
@Controller('exo')
@ApiBearerAuth()
export class ExerciseController {

    constructor(
        private readonly exerciceService: ExerciceService,
    ) {}

    @Post()
    @ApiResponse({ status: 201, description: 'The exercise has been successfully created.', type: Exercice })
    async createExo(@Body() exo: Exercice, @UserConnected() user: User): Promise<Exercice> {
        exo.creator = user;
        return this.exerciceService.createExerice(exo);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Get a list of all exercise.', type: Exercice, isArray: true })
    async findAll(): Promise<Exercice[]> {
        return this.exerciceService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'The exercise with the matching id', type: Exercice })
    @ApiResponse({ status: 404, description: 'Not found.' })
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async findOne(@Param() { id }): Promise<Exercice> {
        return (await this.exerciceService.findById(id)).orElseThrow(() => new NotFoundException());
    }

    @ApiResponse({ status: 200, description: 'The exercise is correctly deleted' })
    @Delete(':id')
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async deleteOne(@Param() { id }) {
        return this.exerciceService.delete(id);
    }

    @ApiResponse({ status: 200, description: 'The exercice have been linked', type: Exercice })
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    @ApiImplicitParam({ type: Number, name: 'groupId', required: true })
    @Post(':id/linkTo/:groupId')
    async linkToGroup(@Param() { id, groupId }): Promise<Exercice> {
        return this.exerciceService.linkToGroup(id, groupId);
    }

    @ApiResponse({ status: 200, description: 'The exercice have been unlinked', type: Exercice })
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    @ApiImplicitParam({ type: Number, name: 'groupId', required: true })
    @Post(':id/unlinkTo/:groupId')
    async unlinkToGroup(@Param('id', new ParseIntPipe()) id, @Param('groupId', new ParseIntPipe()) groupId): Promise<Exercice> {
        return this.exerciceService.unlinkToGroup(id, groupId);
    }
}