import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {AlertService, AuthenticationService, ExerciceService} from '../_services/index';
import { User} from "../_models/index";

@Component({
    moduleId: module.id,
    templateUrl: 'exerciceform.component.html'
})

export class ExerciceformComponent implements OnInit{
    exercice: any = {};
    loading = false;
    currentUser: User;

    constructor(
        private router: Router,
        private exerciceService: ExerciceService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ){
    }

    ngOnInit(): void {
        this.currentUser = this.authenticationService.user;
    }

    createExercice() {
        this.loading = true;
        this.exercice.createur = this.currentUser.username;
        this.exerciceService.create(this.exercice)
            .subscribe(
                data => {
                    this.alertService.success('Création réussie', true);
                    this.router.navigate(['/myexercices']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
