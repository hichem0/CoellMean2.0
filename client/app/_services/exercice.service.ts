import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import {Exercice, Group} from "../_models/index";
import {E} from "@angular/core/src/render3";

@Injectable()
export class ExerciceService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Exercice[]>(appConfig.apiUrl + '/exo');
    }

    getById(id: string) {
        return this.http.get<Exercice>(appConfig.apiUrl + '/exo/' + id);
    }

    create(exercice: Exercice) {
        return this.http.post(appConfig.apiUrl + '/exo', exercice);
    }

    delete(id: string) {
        return this.http.delete(appConfig.apiUrl + '/exo/' + id);
    }

    linkTo(exercice: Exercice, group: Group) {
        return this.http.post( appConfig.apiUrl + '/exo/' + exercice.id + '/linkTo/' + group.id, exercice);
    }

    unlinkTo(exercice: Exercice, group: Group) {
        return this.http.post( appConfig.apiUrl + '/exo/' + exercice.id + '/unlinkTo/' + group.id, exercice);
    }
}