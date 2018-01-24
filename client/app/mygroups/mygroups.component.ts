import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import {Group} from "../_models/group";
import {GroupService} from "../_services/group.service";

@Component({
    moduleId: module.id,
    templateUrl: 'mygroups.component.html'
})

export class MygroupsComponent implements OnInit {
    currentUser: User;
    groups: Group[] = [];

    constructor(private groupService: GroupService) {
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
}