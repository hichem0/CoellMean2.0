import { Component, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import Optional from 'typescript-optional';
import { UserRegisterDto } from '../dto/user.register.dto';
import { ROLE_USER } from '../authority/authority.constants';
import { Authority } from '../authority/authority.entity';
import { UserUpdateDto } from '../dto/user.update.dto';

@Component()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<Optional<User>> {
        const user = await this.userRepository.findOne({ id });
        return Optional.ofNullable(user);
    }

    async findByUsername(username: string): Promise<Optional<User>> {
        const user = await this.userRepository.findOne({ username });
        return Optional.ofNullable(user);
    }

    getHashString(passwd: string): string {
        return bcrypt.hashSync(passwd, 10);
    }

    doPasswordMatch(passwd: string, user: User): boolean {
        return bcrypt.compareSync(passwd, user.password);
    }

    save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    deleteUser(userId: number): Promise<void> {
        return this.userRepository.deleteById(userId);
    }

    async upateUser(userDto: UserUpdateDto, userId: number): Promise<User> {
        const user = (await this.findById(userId)).orElseThrow(() => new NotFoundException());
        if (userDto.firstName) {
            user.firstName = userDto.firstName;
        }
        if (userDto.lastName) {
            user.lastName = userDto.lastName;
        }
        if (userDto.password) {
            user.password = this.getHashString(userDto.password);
        }
        return this.userRepository.save(user);
    }

    saveDto(userDto: UserRegisterDto): Promise<User> {
        const user = new User();
        user.username = userDto.username;
        user.firstName = userDto.firstName;
        user.lastName = userDto.lastName;
        user.password = this.getHashString(userDto.password);
        return this.userRepository.save(user);
    }
}
