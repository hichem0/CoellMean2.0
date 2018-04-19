import {Component} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import Optional from 'typescript-optional';
import {User} from "../user/user.entity";
import {Group} from "./group.entity";


@Component()
export class GroupService {

    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
    ) {}

    async findAll(): Promise<Group[]> {
        return this.groupRepository.find();
    }

    async findById(id: number): Promise<Optional<Group>> {
        const group = await this.groupRepository.findOne({ id });
        return Optional.ofNullable(group);
    }

    delete(userId: number): Promise<void> {
        return this.groupRepository.deleteById(userId);
    }
}