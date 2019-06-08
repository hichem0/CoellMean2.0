import {
    Entity, Column, JoinTable, ManyToMany, JoinColumn, OneToOne,
    ManyToOne,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { DbAuditModel } from '../../util/dbmodel.model';
import { User } from '../user/user.entity';
import { Exercice } from '../exercice/exercise.entity';

@Entity()
export class Group extends DbAuditModel{

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    groupname: string;

    @ApiModelProperty({ required: true })
    @ManyToOne(type => User, user => user.adminGroups, { eager: true })
    admin: User;

    @ApiModelProperty({ required: true })
    @ManyToMany(type => User, user => user.membeGroups, { eager: true })
    @JoinTable()
    users: User[];

    @ManyToMany(type => Exercice, exo => exo.groups, { eager: true })
    @JoinTable()
    exercices: Exercice[];

}
