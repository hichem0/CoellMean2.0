import {
    Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, JoinColumn, OneToOne,
    CreateDateColumn, UpdateDateColumn, VersionColumn,
} from 'typeorm';
import { Authority } from '../authority/authority.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { DbAuditModel } from '../../util/dbmodel.model';
import {Group} from "../group/group.entity";

@Entity()
export class User extends DbAuditModel{

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    firstName: string;

    @ApiModelProperty({ required: true })
    @Column({ length: 500 })
    lastName: string;

    @Column()
    @Exclude()
    password: string;

    @ApiModelProperty({ required: true })
    @Column({ unique: true })
    username: string;

    @ManyToMany(type => Authority, authority => authority.users, {
        eager: true,
        cascadeUpdate: true,
    })
    @ApiModelProperty({ isArray: true, type: Authority })
    @JoinTable()
    @Type(() => Authority)
    authority: Authority[];


    adminGroups: Group[];


    membeGroups: Group[];


}
