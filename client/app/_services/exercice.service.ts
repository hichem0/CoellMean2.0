import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import {Exercice} from "../_models/index";

@Injectable()
export class ExerciceService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Exercice[]>(appConfig.apiUrl + '/exercices');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/exercices/' + _id);
    }

    create(exercice: Exercice) {
        return this.http.post(appConfig.apiUrl + '/exercices/create', exercice);
    }

    update(exercice: Exercice) {
        return this.http.put(appConfig.apiUrl + '/exercices/' + exercice._id, exercice);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/exercices/' + _id);
    }
}