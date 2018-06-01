import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { Authority } from './authority/authority.entity';
import { AuthorityService } from './authority/authority.service';
import { RolesGuard } from '../gard/roles.guard';
import { Group } from './group/group.entity';
import { GroupController } from './group/group.controller';
import { GroupService } from './group/group.service';
import {Exercice} from './exercice/exercise.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Authority, Group, Exercice])],
    controllers: [UserController, GroupController],
    components: [UserService, AuthorityService, RolesGuard, GroupService],
    exports: [UserService],
})
export class AppModule {}
