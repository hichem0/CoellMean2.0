import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { appConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(appConfig.apiUrl + '/auth/token', { username: username, password: password })
            .map(access_token => {
                // login successful if there's a jwt token in the response
                if (access_token && access_token.access_token) {
                    // store  jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('accessToken', JSON.stringify(access_token));
                }
                return access_token;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('accessToken');
    }
}