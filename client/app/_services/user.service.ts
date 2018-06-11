import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(appConfig.apiUrl + '/user');
    }

    getCurrentUser() {
        return this.http.get(appConfig.apiUrl + '/auth/me');
    }

    getById(id: string) {
        return this.http.get(appConfig.apiUrl + '/user/' + id);
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + '/user', user);
    }

    update(user: User) {
        return this.http.put(appConfig.apiUrl + '/user/' + user.id, user);
    }

    delete(id: string) {
        return this.http.delete(appConfig.apiUrl + '/user/' + id);
    }
}