import { Component, OnInit } from '@angular/core';

import {Exercice, User} from '../_models/index';
import {ExerciceService} from "../_services/index";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'myexercices.component.html'
})

export class MyexercicesComponent implements OnInit {
    currentUser: User;
    exercices: Exercice[] = [];

    constructor(private exerciceService: ExerciceService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllExercices();
    }

    deleteExercice(_id: string) {
        this.exerciceService.delete(_id).subscribe(() => { this.loadAllExercices() });
    }

    private loadAllExercices() {
        this.exerciceService.getAll().subscribe(exercices => { this.exercices = exercices; });
    }

    goToExerciceDetails(titre: string) {
        const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
        queryParams['titre'] = titre;
        this.router.navigate(['/exercice'], { queryParams: queryParams });
    }
}