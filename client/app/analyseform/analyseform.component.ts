import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AlertService, AnalyseService, AuthenticationService, ExerciceService} from '../_services/index';
import {Analyse, Exercice, Paire, User} from "../_models/index";

@Component({
    moduleId: module.id,
    templateUrl: 'analyseform.component.html'
})

export class AnalyseformComponent implements OnInit{
    analyse: Analyse;
    langue: string = "english";
    vocabulaire: Paire[] = [];
    traduction: Paire[] = [];
    grammaire: Paire[] = [];
    ideeGlobales: string[] = [];
    liens: string[] = [];
    loading = false;
    paire: Paire;
    currentUser: User;
    exercice: Exercice;
    motS: string = "";
    syn: string = "";
    motT: string = "";
    trad: string = "";
    motG: string = "";
    anaG: string = "";
    ig: string = "";
    lien: string = "";

    constructor(
        private router: Router,
        private analyseService: AnalyseService,
        private exerciceService: ExerciceService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.analyse = new Analyse();
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
        this.currentUser = this.authenticationService.user;
    }

    loadExercice(): void{
        this.exerciceService.getById(this.analyse.idarticle)
            .subscribe(
                data => {
                    this.exercice = data; });
    }

    addVoc(): void{
        if (this.motS !== "" && this.syn !== "") {
            this.paire = {"key": this.motS, "value": this.syn};
            this.vocabulaire.push(this.paire)
            this.motS = "";
            this.syn = "";
        }
    }

    addTrad(): void{
        if (this.motT !== "" && this.trad !== "") {
            this.paire = {"key": this.motT, "value": this.trad};
            this.traduction.push(this.paire)
            this.motT = "";
            this.trad = "";
        }
    }

    addGramm(): void{
        if (this.motG !== "" && this.anaG !== "") {
            this.paire = {"key": this.motG, "value": this.anaG};
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
        this.analyse.langue = this.langue;
        this.analyse.vocabulaire = this.vocabulaire;
        this.analyse.tradution = this.traduction;
        this.analyse.grammaire = this.grammaire;
        this.analyse.globalIdea = this.ideeGlobales;
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
