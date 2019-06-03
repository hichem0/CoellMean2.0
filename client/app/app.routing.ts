﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {MygroupsComponent} from "./mygroups/index";
import {GroupformComponent} from "./groupform/index";
import {GroupdetailsComponent} from "./groupdetails/index";
import {ExerciceformComponent} from "./exerciceform/index";
import {ProfilComponent} from "./profil/index";
import {AnalyseformComponent} from "./analyseform/analyseform.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'mygroups', component: MygroupsComponent},
    { path: 'group/create', component: GroupformComponent},
    { path: 'group', component: GroupdetailsComponent},
    { path: 'exercice/create', component: ExerciceformComponent},
    { path: 'profil', component: ProfilComponent},
    { path: 'analyse', component: AnalyseformComponent },
    { path: 'correction', component: AnalyseformComponent},


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);