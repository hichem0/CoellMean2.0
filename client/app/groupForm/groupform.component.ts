import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, GroupService } from '../_services/index';
import {User} from "../_models";

@Component({
    moduleId: module.id,
    templateUrl: 'groupform.component.html'
})

export class GroupformComponent {
    model: any = {};
    loading = false;
    currentUser: User;

    constructor(
        private router: Router,
        private groupService: GroupService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }

    createGroup() {
        this.loading = true;
        this.model.adminname = this.currentUser.username;
        this.groupService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Création réussie', true);
                    this.router.navigate(['/mygroups']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
