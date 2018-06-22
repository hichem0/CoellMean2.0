import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AlertService, AnalyseService, AuthenticationService, ExerciceService} from '../_services/index';
import {Analyse, Exercice, Paire, User} from "../_models/index";

@Component({
    moduleId: module.id,
    templateUrl: 'analyseform.component.html'
})

export class AnalyseformComponent implements OnInit{
    beforeExist: boolean = false;
    correction: boolean = false;
    analyse: Analyse;
    // langue: string = "english";
    // vocabulaire: Paire[] = [];
    // traduction: Paire[] = [];
    // grammaire: Paire[] = [];
    // ideeGlobales: string[] = [];
    // liens: string[] = [];
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
        this.initAnalyse();
        if(this.route.snapshot.url[0].path == 'correction'){
            this.correction = true;
        }
        this.route.queryParams
            .filter(params => params.idArticle)
            .subscribe(params => {
                this.analyse.idarticle = params.idArticle;
                this.loadExercice();
            });
        this.route.queryParams
            .filter(params => params.idAnalyse)
            .subscribe(params => {
                this.analyse.id = params.idAnalyse;
                this.loadAnalyse();
            });
        // this.vocabulaire = [];
        // this.traduction = [];
        // this.grammaire = [];
        // this.ideeGlobales = [];
        // this.liens = [];
        this.authenticationService.me().subscribe( user => {
            this.setUser(user);
        });
    }

    loadExercice(): void {
        this.exerciceService.getById(this.analyse.idarticle)
            .subscribe(
                exercice => {
                    this.exercice = exercice;
                });
    }

    loadAnalyse(): void {
        this.analyseService.getById(this.analyse.id)
            .subscribe(
                analyse => {
                    this.analyse = analyse;
                    this.exercice = this.analyse.exercice;
                    this.analyse.idarticle = this.exercice.id;
                    this.beforeExist = true;
                }
            )
    }

    initAnalyse(): void {
        this.analyse = new Analyse();
        this.analyse.tradution = [];
        this.analyse.vocabulaire = [];
        this.analyse.grammaire = [];
        this.analyse.globalIdea = [];
        this.analyse.liensExterne = [];
    }

    addVoc(): void {
        if (this.motS !== "" && this.syn !== "") {
            this.paire = {"key": this.motS, "value": this.syn};
            this.analyse.vocabulaire.push(this.paire)
            this.motS = "";
            this.syn = "";
        }
    }

    removeVoc(item: Paire): void {
        if(confirm('supprimer la réponse ?')) {
            this.analyse.vocabulaire.splice(this.analyse.vocabulaire.indexOf(item,0),1);
        }
    }

    addTrad(): void {
        if (this.motT !== "" && this.trad !== "") {
            this.paire = {"key": this.motT, "value": this.trad};
            this.analyse.tradution.push(this.paire)
            this.motT = "";
            this.trad = "";
        }
    }

    removeTrad(item: Paire): void {
        if(confirm('supprimer la réponse ?')) {
            this.analyse.tradution.splice(this.analyse.tradution.indexOf(item,0),1);
        }
    }

    addGramm(): void {
        if (this.motG !== "" && this.anaG !== "") {
            this.paire = {"key": this.motG, "value": this.anaG};
            this.analyse.grammaire.push(this.paire)
            this.motG = "";
            this.anaG = "";
        }
    }

    removeGramm(item: Paire): void {
        if(confirm('supprimer la réponse ?')) {
            this.analyse.grammaire.splice(this.analyse.grammaire.indexOf(item,0),1);
        }
    }

    addIG(): void {
        if(this.ig !== ""){
            this.analyse.globalIdea.push(this.ig);
            this.ig = "";
        }
    }

    removeIG(item: string): void {
        if(confirm('supprimer la réponse ?')) {
            this.analyse.globalIdea.splice(this.analyse.globalIdea.indexOf(item,0),1);
        }
    }

    addLink(): void {
        if(this.lien !== ""){
            this.analyse.liensExterne.push(this.lien);
            this.lien = "";
        }
    }

    removeLink(item: string): void {
        if(confirm('supprimer le lien ?')) {
            this.analyse.liensExterne.splice(this.analyse.liensExterne.indexOf(item,0),1);
        }
    }

    createAnalyse(): void {
        this.loading = true;
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

    noteAnalyse(): void {
        this.loading = true;
        this.analyseService.grade(this.analyse) .subscribe(
            data => {
                this.alertService.success('Correction validée', true);
                this.router.navigate(['/myanalyses']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    back() {
        if(confirm('Quitter la page ?')){
            this.router.navigate(['/mygroups']);
        }
    }

    private setUser(user: User) {
        this.currentUser = user;
    }

    getMaxGrade() {
        return this.exercice.maxGradeVocab + this.exercice.maxGradeArgumentation
        + this.exercice.maxGradeExternalLinks + this.exercice.maxGradeGlobalIdee
        + this.exercice.maxGradeTrad + this.exercice.maxGradeGramar;
    }

}
