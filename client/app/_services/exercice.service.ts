import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import {Exercice} from "../_models/index";

@Injectable()
export class ExerciceService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Exercice[]>(appConfig.apiUrl + '/exo');
    }

    getById(id: string) {
        return this.http.get(appConfig.apiUrl + '/exo/' + id);
    }

    create(exercice: Exercice) {
        return this.http.post(appConfig.apiUrl + '/exo', exercice);
    }

    // update(exercice: Exercice) {
    //     return this.http.put(appConfig.apiUrl + '/exo/' + exercice.id, exercice);
    // }

    delete(id: string) {
        return this.http.delete(appConfig.apiUrl + '/exo/' + id);
    }
}