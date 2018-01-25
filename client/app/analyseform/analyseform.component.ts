import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AlertService, AnalyseService, ExerciceService} from '../_services/index';
import {Exercice, Paire, User} from "../_models/index";

@Component({
    moduleId: module.id,
    templateUrl: 'analyseform.component.html'
})

export class AnalyseformComponent implements OnInit{
    analyse: any = {};
    vocabulaire: Paire[];
    traduction: Paire[];
    grammaire: Paire[];
    ideeGlobales: string[];
    liens: string[];
    loading = false;
    paire: Paire;
    currentUser: User;
    exercice: any;
    motS: string;
    syn: string;
    motT: string;
    trad: string;
    motG: string;
    anaG: string;
    ig: string;
    lien: string;

    constructor(
        private router: Router,
        private analyseService: AnalyseService,
        private exerciceService: ExerciceService,
        private alertService: AlertService,
        private route: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        this.route.queryParams
            .filter(params => params.id)
            .subscribe(params => {
                this.analyse.idarticle = params.id;
                this.loadExercice();
            });
        this.vocabulaire = [];
        this.traduction = [];
        this.grammaire = [];
        this.ideeGlobales = [];
        this.liens = [];
    }

    loadExercice(): void{
        this.exerciceService.getById(this.analyse.idarticle)
            .subscribe(
                data => {
                    this.exercice = data; });
    }

    addVoc(): void{
        if (this.motS !== "" && this.syn !== "") {
            this.paire = {mot1: this.motS, mot2: this.syn};
            this.vocabulaire.push(this.paire)
            this.motS = "";
            this.syn = "";
        }
    }

    addTrad(): void{
        if (this.motT !== "" && this.trad !== "") {
            this.paire = {mot1: this.motT, mot2: this.trad};
            this.traduction.push(this.paire)
            this.motT = "";
            this.trad = "";
        }
    }

    addGramm(): void{
        if (this.motG !== "" && this.anaG !== "") {
            this.paire = {mot1: this.motG, mot2: this.anaG};
            this.grammaire.push(this.paire)
            this.motG = "";
            this.anaG = "";
        }
    }

    addIG(): void{
        if(this.ig !== ""){
            this.ideeGlobales.push(this.ig);
            this.ig = "";
        }
    }

    addLink(): void{
        if(this.lien !== ""){
            this.liens.push(this.lien);
            this.lien = "";
        }
    }

    createAnalyse(): void{
        this.loading = true;
        this.analyse.createur = this.currentUser.username;
        this.analyse.vocabulaire = this.vocabulaire;
        this.analyse.traduction = this.traduction;
        this.analyse.groupName = this.grammaire;
        this.analyse.ig = this.ideeGlobales;
        this.analyse.liensExterne = this.liens;
        this.analyseService.create(this.analyse)
            .subscribe(
                data => {
                    this.alertService.success('Analyse remise pour correction', true);
                    this.router.navigate(['/myanalyses']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
