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
import { Exercice } from './exercice/exercise.entity';
import { ExerciceService } from './exercice/exercice.component';
import { ExerciseController } from './exercice/exercise.controller';
import { WordPair } from './wordPair/wordPair.entity';
import { WordPairService } from './wordPair/wordPair.service';
import { Analyse } from './analyse/analyse.entity';
import { AnalyseController } from './analyse/analyse.controller';
import { AnalyseService } from './analyse/analyse.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Authority,
            Group,
            Exercice,
            WordPair,
            Analyse,
        ]),
    ],
    controllers: [
        UserController,
        GroupController,
        ExerciseController,
        AnalyseController,
    ],
    components: [
        UserService,
        AuthorityService,
        RolesGuard,
        GroupService,
        ExerciceService,
        WordPairService,
        AnalyseService,
    ],
    exports: [
        UserService,
    ],
})
export class AppModule {}
