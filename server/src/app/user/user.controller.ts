import {
    Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Post,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserRegisterDto } from '../dto/user.register.dto';
import {ApiUseTags, ApiResponse, ApiImplicitParam, ApiBearerAuth} from '@nestjs/swagger';
import {UserUpdateDto} from "../dto/user.update.dto";

@ApiUseTags('User management')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}

    @ApiBearerAuth()
    @Get()
    @ApiResponse({ status: 200, description: 'Get a list of all users.', type: User, isArray: true })
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
    @ApiResponse({ status: 409, description: 'There is a conflict with the email or phone number.' })
    async register(@Body() userRegisterDto: UserRegisterDto): Promise<User> {
        let maybeUser = await this.userService.findByUsername(userRegisterDto.username);
        if (maybeUser.isPresent) {
            throw new  ConflictException('Username already taken');
        }
        return await this.userService.saveDto(userRegisterDto);
    }

    @ApiBearerAuth()
    @Get(':id')
    @ApiResponse({ status: 200, description: 'The user with the matching id', type: User })
    @ApiResponse({ status: 404, description: 'Not found.' })
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async findOne(@Param() { id }): Promise<User> {
        const user = await this.userService.findById(id);
        return user.orElseThrow(() => new NotFoundException());
    }

    @ApiBearerAuth()
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The user is correctly deleted', type: User })
    @ApiResponse({ status: 404, description: 'Not found.' })
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async deleteOne(@Param() { id }): Promise<void> {
        return this.userService.deleteUser(id);
    }

    @ApiBearerAuth()
    @Post(':id')
    @ApiImplicitParam({ type: Number, name: 'id', required: true })
    async updateUser(@Body() userUpdateDto: UserUpdateDto, @Param() { id }): Promise<User> {
        return this.userService.upateUser(userUpdateDto, id);
    }
}
