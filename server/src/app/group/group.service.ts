import { Component, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';
import { Group } from './group.entity';

@Component()
export class GroupService {

    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
    ) {}

    async createGroup(name: string, user: User): Promise<Group> {
        const newGroup = new Group();
        newGroup.groupname = name;
        newGroup.admin = user;
        return this.groupRepository.save(newGroup);
    }

    async addUserToGroup(id: number, user: User): Promise<Group> {
        const group = (await this.findById(id)).orElseThrow(() => new NotFoundException());
        group.users = [...group.users, user];
        return this.groupRepository.save(group);
    }

    async findAll(): Promise<Group[]> {
        return this.groupRepository.find();
    }

    async findById(id: number): Promise<Optional<Group>> {
        const group = await this.groupRepository.findOne({ id });
        return Optional.ofNullable(group);
    }

    async delete(id: number): Promise<void> {
        const group = (await this.findById(id)).orElseThrow(() => new NotFoundException());
        await this.groupRepository.remove(group);
    }
}