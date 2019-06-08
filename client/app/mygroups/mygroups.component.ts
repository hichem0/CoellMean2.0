import { Component, OnInit } from '@angular/core';

import {Group, User} from '../_models/index';
import {AuthenticationService, GroupService} from "../_services/index";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'mygroups.component.html'
})

export class MygroupsComponent implements OnInit {
    currentUser: User;
    groups: Group[] = [];
    myGroups : Group[];
    memberGroups : Group[];
    otherGroups : Group[];


    constructor(private groupService: GroupService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.loadAllGroups();
    }

    private repartGroups() {
        this.myGroups = [];
        this.memberGroups = [];
        this.otherGroups = [];

        for( let group of this.groups) {
            if(group.admin.username === this.currentUser.username) {
                this.myGroups.push(group);
            } else if(this.beMember(group)){
                this.memberGroups.push(group)
            } else if(!this.beMember(group) && group.admin.username !== this.currentUser.username) {
                this.otherGroups.push(group);
            }
        }

    }

    private loadAllGroups() {
        this.groupService.getAll().subscribe(groups => {
            this.groups = groups;
            this.authenticationService.me()
                .subscribe( user => {
                    this.setUser(user);
                });
        });

    }

    goToGroupDetails(groupname: string) {
        const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
        queryParams['groupname'] = groupname;
        this.router.navigate(['/group'], { queryParams: queryParams });
    }

    beMember (group:Group) {
        let flag = false;
        for (let user of group.users){
            if (user.username === this.currentUser.username) {
                flag = true;
            }
        }
        return flag;
    }

    private setUser(user: any) {
        this.currentUser = user;
        this.repartGroups();
    }
}