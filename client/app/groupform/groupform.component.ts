import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {AlertService, AuthenticationService, GroupService} from '../_services/index';
import {Group, User} from "../_models/index";

@Component({
    moduleId: module.id,
    templateUrl: 'groupform.component.html'
})

export class GroupformComponent implements OnInit{
    group: any = {};
    loading = false;
    currentUser: User;

    constructor(
        private router: Router,
        private groupService: GroupService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.currentUser = this.authenticationService.user;
    }

    createGroup() {
        this.loading = true;
        this.group.adminname = this.currentUser.username;
        this.group.users = [];
        this.groupService.create(this.group)
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
