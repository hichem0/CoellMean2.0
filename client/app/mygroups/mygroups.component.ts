import { Component, OnInit } from '@angular/core';

import {Group, User} from '../_models/index';
import {GroupService} from "../_services/index";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'mygroups.component.html'
})

export class MygroupsComponent implements OnInit {
    currentUser: User;
    groups: Group[] = [];

    constructor(private groupService: GroupService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllGroups();

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