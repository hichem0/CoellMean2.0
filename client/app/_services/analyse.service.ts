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
        return this.http.get<Analyse>(appConfig.apiUrl + '/analyse/' + _id);
    }

    create(analyse: Analyse) {
        return this.http.post(appConfig.apiUrl + '/exo/' + analyse.idarticle + '/answer', analyse);
    }

    grade(analyse: Analyse) {
        return this.http.post(appConfig.apiUrl + '/analyse/' + analyse.idarticle + '/grade', analyse)
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/analyses/' + _id);
    }
}