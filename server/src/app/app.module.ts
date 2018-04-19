import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { Authority } from './authority/authority.entity';
import { AuthorityService } from './authority/authority.service';
import { RolesGuard } from '../gard/roles.guard';
import {Group} from "./group/group.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Authority, Group])],
    controllers: [UserController],
    components: [UserService, AuthorityService, RolesGuard],
    exports: [UserService],
})
export class AppModule {}
