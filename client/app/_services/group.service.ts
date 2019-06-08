import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import {Group} from "../_models/group";
import {User} from "../_models";

@Injectable()
export class GroupService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Group[]>(appConfig.apiUrl + '/group');
    }

    getById(id: string) {
        return this.http.get(appConfig.apiUrl + '/group/' + id);
    }

    create(group: Group) {
        return this.http.post(appConfig.apiUrl + '/group', group);
    }

    update(group: Group) {
        return this.http.post(appConfig.apiUrl + '/group/' + group.id, group);
    }

    delete(id: string) {
        return this.http.delete(appConfig.apiUrl + '/group/' + id);
    }

    joinGroup(group: Group){
        return this.http.post(appConfig.apiUrl + '/group/' + group.id + '/join',group);
    }

    leaveGroup(group: Group) {
        return this.http.post(appConfig.apiUrl + '/group/' + group.id + '/leave', group);
    }

    kickUser(group: Group, user: User) {
        return this.http.post( appConfig.apiUrl + '/group/' + group.id + '/kickUser/' + user.id, group);
    }
}