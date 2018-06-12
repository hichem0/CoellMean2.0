import { Component, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';
import { Group } from './group.entity';
import { uniqFilter } from '../utils';

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
        group.users = [...group.users, user].filter(uniqFilter);
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

    async leaveGroup(id: number, user: User): Promise<Group> {
        const group = (await this.findById(id)).orElseThrow(() => new NotFoundException());
        group.users = group.users.filter(u => u.id !== user.id);
        return this.groupRepository.save(group);
    }

    async kickUserFromGroup(id: number, userId: number, user: User): Promise<Group> {
        const group = (await this.findById(id)).orElseThrow(() => new NotFoundException());
        if (group.admin.id !== user.id) {
            throw new UnauthorizedException();
        }
        group.users = group.users.filter(u => u.id !== userId);
        return this.groupRepository.save(group);
    }

    async save(group: Group): Promise<Group> {
        return this.groupRepository.save(group);
    }
}