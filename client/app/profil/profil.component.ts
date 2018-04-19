import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';

import {User} from '../_models/index';
import { AlertService, UserService } from '../_services/index';
import {currentId} from "async_hooks";

@Component({
    moduleId: module.id,
    templateUrl: 'profil.component.html'
})

export class ProfilComponent implements OnInit{
    model: any = {};
    loading = false;
    currentUser: User;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

    ngOnInit() {
    }

    updateUser() {
        this.loading = true;
        this.userService.update(this.currentUser)
            .subscribe(
                data => {
                    this.alertService.success('modification réussie', true);
                    this.router.navigate(['']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
