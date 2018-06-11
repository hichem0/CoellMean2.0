import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


import { appConfig } from '../app.config';

@Injectable()
export class AuthenticationService {

    user : any;

    constructor(private http: HttpClient, private router: Router) {
        this.user = this.me();
    }

    login(username: string, password: string) {
        return this.http.post<any>(appConfig.apiUrl + '/auth/token', { username: username, password: password })
            .mergeMap(token => {
                // login successful if there's a jwt token in the response
                if (token && token.access_token) {
                    // store  jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('accessToken', JSON.stringify(token.access_token));
                }
                return this.me();
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('accessToken');
        this.user = null;
        this.router.navigate(['/login']);
    }

    me() {
        return this.http.get(appConfig.apiUrl + '/auth/me')
            .map(user => {
                this.user = user;

                return user;
            })
    }
}