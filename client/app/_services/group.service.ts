import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import {Group} from "../_models/group";

@Injectable()
export class GroupService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Group[]>(appConfig.apiUrl + '/group');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/group/' + _id);
    }

    create(group: Group) {
        return this.http.post(appConfig.apiUrl + '/group/create', group);
    }

    update(group: Group) {
        return this.http.put(appConfig.apiUrl + '/group/' + group._id, group);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/group/' + _id);
    }
}