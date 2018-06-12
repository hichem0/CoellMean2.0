import {Component, OnInit} from '@angular/core';
import {Group, User} from "../_models/index";
import {AlertService, GroupService, UserService, AuthenticationService} from "../_services/index";
import {ActivatedRoute, Params, Router} from "@angular/router";
import 'rxjs/add/operator/filter';


@Component({
    moduleId: module.id,
    templateUrl: 'groupdetails.component.html'
})

export class GroupdetailsComponent implements OnInit {
    currentUser: User;
    group: Group;
    users: User[];
    groupName: string;
    loading = false;

    constructor(private groupService: GroupService,
                private route: ActivatedRoute,
                private alertService: AlertService,
                private router: Router,
                private authService: AuthenticationService,
                private activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        this.getGroup();
        this.route.queryParams
            .filter(params => params.groupname)
            .subscribe(params => {
                this.groupName = params.groupname;
            });
        this.authService.me().subscribe( user => {
            this.setUser(user);
        });
    }

    private getGroup() {
        this.groupService.getAll().subscribe( groups => {
            for (let group of groups) {
                if (group.groupname === this.groupName) {
                    this.group = group;
                }
            }
        });
    }

    private addUserAtGroup(username: string) {
        this.group.users.push( this.users.find( function(user) {
            return user.username === username;
        }));
        this.groupService.update(this.group)
            .subscribe(
            data => {
                this.alertService.success( username + ' ajouté au groupe', true);
                this.goToGroupDetails(this.group.groupname);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    private deleteUserAtGroup(username: string) {
        this.group.users = this.group.users.filter(user => user.username !== username)
        this.groupService.update(this.group)
            .subscribe(
                data => {
                    this.alertService.success( username + ' supprimé au groupe', true);
                    this.goToGroupDetails(this.group.groupname);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    goToGroupDetails(groupname: string) {
        const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
        queryParams['groupname'] = groupname;
        this.router.navigate(['/group'], { queryParams: queryParams });
    }

    private userInGroup(username: string){
        if (username === this.group.admin.username) {
            return true;
        }
        for (let user of this.group.users) {
            if (user.username === username){
                return true;
            }
        }
        return false;
    }

    deleteGroup() {
        if(confirm("Confirmer la suppresion du group ? ")) {
            this.groupService.delete(this.group.id).subscribe(() => { this.router.navigate(['/mygroups']) });
        }
    }

    join() {
        this.groupService.joinGroup(this.group)
            .subscribe(
                data => {
                    this.alertService.success( 'Vous avez rejoint le groupe', true);
                    this.group.users.push(this.currentUser);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    leave() {
        if(confirm('Confirmer le départ du groupe ?')){
            this.groupService.leaveGroup(this.group)
                .subscribe(
                    data => {
                        this.router.navigate(['/mygroups']);
                    },
                    error => {
                        //this.alertService.error(error);
                        this.loading = false;
                    });
        }
    }

    back(){
        this.router.navigate(['/mygroups']);
    }

    beMember() {
        let flag = false;
        for (let user of this.group.users){
            if (user.username === this.currentUser.username) {
                flag = true;
            }
        }
        return flag;
    }

    private setUser(user: any) {
        this.currentUser = user;
    }
}
