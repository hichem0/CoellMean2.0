import {Component, OnInit} from '@angular/core';
import { User } from './_models/index';
import { UserService, AuthenticationService } from './_services/index';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{
    private IMAGE_URL: any;
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService, private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.loadAllUsers();
        this.currentUser = this.authenticationService.user;
    }

    deleteUser(id: string) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private getCurrentUser() {
        
    }

    logout() {
        this.authenticationService.logout();
    }

}