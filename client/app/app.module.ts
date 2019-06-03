import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs'

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './_helpers/index';
import {AlertService, AnalyseService, AuthenticationService, ExerciceService, UserService} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {MygroupsComponent} from "./mygroups/index";
import {GroupService} from "./_services/group.service";
import {GroupformComponent} from "./groupform/index";
import {GroupdetailsComponent} from "./groupdetails/index";
import {ExerciceformComponent} from "./exerciceform/index";
import {ProfilComponent} from "./profil/index";
import {AnalyseformComponent} from "./analyseform/analyseform.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        TabsModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MygroupsComponent,
        GroupformComponent,
        GroupdetailsComponent,
        ExerciceformComponent,
        ProfilComponent,
        AnalyseformComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        GroupService,
        AnalyseService,
        ExerciceService,
        JwtInterceptorProvider,
        ErrorInterceptorProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }