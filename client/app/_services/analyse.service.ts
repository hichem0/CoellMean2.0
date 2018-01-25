import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import {Analyse} from "../_models/index";

@Injectable()
export class AnalyseService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Analyse[]>(appConfig.apiUrl + '/analyses');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/analyses/' + _id);
    }

    create(analyses: Analyse) {
        return this.http.post(appConfig.apiUrl + '/analyses/create', analyses);
    }

    update(analyses: Analyse) {
        return this.http.put(appConfig.apiUrl + '/analyses/' + analyses._id, analyses);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/analyses/' + _id);
    }
}