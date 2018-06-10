import { ApiBearerAuth, ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { User } from '../user/user.entity';
import { GroupeCreateDto } from '../dto/groupe.create.dto';
import { UserConnected } from '../../decorator/user.decorator';

@ApiUseTags('Group management')
@Controller('group')
@ApiBearerAuth()
export class GroupController {

    constructor(
        private readonly groupService: GroupService,
    ) {}

    @Post()
    @ApiResponse({ status: 201, description: 'The group has been successfully created.', type: Group })
    async createGroup(@Body() groupDto: GroupeCreateDto, @UserConnected() user: User): Promise<Group> {
        return this.groupService.createGroup(groupDto.groupname, user);
    }

    @Post(':id/join')
    @ApiResponse({ status: 201, description: 'The current user has been added to the group.', type: Group })
    @ApiResponse({ status: 404, description: 'The group was not found.', type: Group })
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async registerToGroup(@Param() { id }, @UserConnected() user: User): Promise<Group> {
        return this.groupService.addUserToGroup(id, user);
    }

    @Post(':id/leave')
    @ApiResponse({ status: 201, description: 'The current user has been removed to the group.', type: Group })
    @ApiResponse({ status: 404, description: 'The group was not found.', type: Group })
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async leaveGroup(@Param() { id }, @UserConnected() user: User): Promise<Group> {
        return this.groupService.leaveGroup(id, user);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Get a list of all users.', type: Group, isArray: true })
    async findAll(): Promise<Group[]> {
        return this.groupService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'The group with the matching id', type: Group })
    @ApiResponse({ status: 404, description: 'Not found.' })
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async findOne(@Param() { id }): Promise<Group> {
        return (await this.groupService.findById(id)).orElseThrow(() => new NotFoundException());
    }

    @ApiResponse({ status: 200, description: 'The group is correctly deleted' })
    @Delete(':id')
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async deleteOne(@Param() { id }) {
        return this.groupService.delete(id);
    }

}