import {
    Entity, Column, JoinTable, ManyToMany, JoinColumn, OneToOne,
    ManyToOne,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { DbAuditModel } from '../../util/dbmodel.model';
import {User} from "../user/user.entity";

@Entity()
export class Group extends DbAuditModel{

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    groupname: string;


    @ApiModelProperty({ required: true })
    @ManyToOne(type => User, user => user.adminGroups, { cascadeAll: true, eager: true})
    admin: User;


    @ApiModelProperty({ required: true })
    @ManyToMany(type => User, user => user.membeGroups, { eager: true })
    @JoinTable()
    users: User[];


}
