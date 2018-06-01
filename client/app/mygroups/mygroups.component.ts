import { Component, OnInit } from '@angular/core';

import {Group, User} from '../_models/index';
import {AuthenticationService, GroupService} from "../_services/index";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../_services/user.service";

@Component({
    moduleId: module.id,
    templateUrl: 'mygroups.component.html'
})

export class MygroupsComponent implements OnInit {
    currentUser: User;
    groups: Group[] = [];

    constructor(private groupService: GroupService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.loadAllGroups();
        this.currentUser = this.authenticationService.user;
    }

    deleteGroup(_id: string) {
        this.groupService.delete(_id).subscribe(() => { this.loadAllGroups() });
    }

    private loadAllGroups() {
        this.groupService.getAll().subscribe(groups => { this.groups = groups; });
    }

    goToGroupDetails(groupname: string) {
        const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
        queryParams['groupname'] = groupname;
        this.router.navigate(['/group'], { queryParams: queryParams });
    }
}