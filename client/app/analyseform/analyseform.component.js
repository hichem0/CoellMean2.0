"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("../_services/index");
var index_2 = require("../_models/index");
var AnalyseformComponent = /** @class */ (function () {
    function AnalyseformComponent(router, analyseService, exerciceService, alertService, route, authenticationService) {
        this.router = router;
        this.analyseService = analyseService;
        this.exerciceService = exerciceService;
        this.alertService = alertService;
        this.route = route;
        this.authenticationService = authenticationService;
        this.beforeExist = false;
        this.correction = false;
        // langue: string = "english";
        // vocabulaire: Paire[] = [];
        // traduction: Paire[] = [];
        // grammaire: Paire[] = [];
        // ideeGlobales: string[] = [];
        // liens: string[] = [];
        this.loading = false;
        this.motS = "";
        this.syn = "";
        this.motT = "";
        this.trad = "";
        this.motG = "";
        this.anaG = "";
        this.ig = "";
        this.lien = "";
    }
    AnalyseformComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initAnalyse();
        if (this.route.snapshot.url[0].path == 'correction') {
            this.correction = true;
        }
        this.route.queryParams
            .filter(function (params) { return params.idArticle; })
            .subscribe(function (params) {
            _this.analyse.idarticle = params.idArticle;
            _this.loadExercice();
        });
        this.route.queryParams
            .filter(function (params) { return params.idAnalyse; })
            .subscribe(function (params) {
            _this.analyse.id = params.idAnalyse;
            _this.loadAnalyse();
        });
        // this.vocabulaire = [];
        // this.traduction = [];
        // this.grammaire = [];
        // this.ideeGlobales = [];
        // this.liens = [];
        this.authenticationService.me().subscribe(function (user) {
            _this.setUser(user);
        });
    };
    AnalyseformComponent.prototype.loadExercice = function () {
        var _this = this;
        this.exerciceService.getById(this.analyse.idarticle)
            .subscribe(function (exercice) {
            _this.exercice = exercice;
        });
    };
    AnalyseformComponent.prototype.loadAnalyse = function () {
        var _this = this;
        this.analyseService.getById(this.analyse.id)
            .subscribe(function (analyse) {
            _this.analyse = analyse;
            _this.exercice = _this.analyse.exercice;
            _this.analyse.idarticle = _this.exercice.id;
            _this.beforeExist = true;
        });
    };
    AnalyseformComponent.prototype.initAnalyse = function () {
        this.analyse = new index_2.Analyse();
        this.analyse.tradution = [];
        this.analyse.vocabulaire = [];
        this.analyse.grammaire = [];
        this.analyse.globalIdea = [];
        this.analyse.liensExterne = [];
    };
    AnalyseformComponent.prototype.addVoc = function () {
        if (this.motS !== "" && this.syn !== "") {
            this.paire = { "key": this.motS, "value": this.syn };
            this.analyse.vocabulaire.push(this.paire);
            this.motS = "";
            this.syn = "";
        }
    };
    AnalyseformComponent.prototype.removeVoc = function (item) {
        if (confirm('supprimer la réponse ?')) {
            this.analyse.vocabulaire.splice(this.analyse.vocabulaire.indexOf(item, 0), 1);
        }
    };
    AnalyseformComponent.prototype.addTrad = function () {
        if (this.motT !== "" && this.trad !== "") {
            this.paire = { "key": this.motT, "value": this.trad };
            this.analyse.tradution.push(this.paire);
            this.motT = "";
            this.trad = "";
        }
    };
    AnalyseformComponent.prototype.removeTrad = function (item) {
        if (confirm('supprimer la réponse ?')) {
            this.analyse.tradution.splice(this.analyse.tradution.indexOf(item, 0), 1);
        }
    };
    AnalyseformComponent.prototype.addGramm = function () {
        if (this.motG !== "" && this.anaG !== "") {
            this.paire = { "key": this.motG, "value": this.anaG };
            this.analyse.grammaire.push(this.paire);
            this.motG = "";
            this.anaG = "";
        }
    };
    AnalyseformComponent.prototype.removeGramm = function (item) {
        if (confirm('supprimer la réponse ?')) {
            this.analyse.grammaire.splice(this.analyse.grammaire.indexOf(item, 0), 1);
        }
    };
    AnalyseformComponent.prototype.addIG = function () {
        if (this.ig !== "") {
            this.analyse.globalIdea.push(this.ig);
            this.ig = "";
        }
    };
    AnalyseformComponent.prototype.removeIG = function (item) {
        if (confirm('supprimer la réponse ?')) {
            this.analyse.globalIdea.splice(this.analyse.globalIdea.indexOf(item, 0), 1);
        }
    };
    AnalyseformComponent.prototype.addLink = function () {
        if (this.lien !== "") {
            this.analyse.liensExterne.push(this.lien);
            this.lien = "";
        }
    };
    AnalyseformComponent.prototype.removeLink = function (item) {
        if (confirm('supprimer le lien ?')) {
            this.analyse.liensExterne.splice(this.analyse.liensExterne.indexOf(item, 0), 1);
        }
    };
    AnalyseformComponent.prototype.createAnalyse = function () {
        var _this = this;
        this.loading = true;
        this.analyseService.create(this.analyse)
            .subscribe(function (data) {
            _this.alertService.success('Analyse remise pour correction', true);
            _this.router.navigate(['/myanalyses']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    AnalyseformComponent.prototype.noteAnalyse = function () {
        var _this = this;
        this.loading = true;
        this.analyseService.grade(this.analyse).subscribe(function (data) {
            _this.alertService.success('Correction validée', true);
            _this.router.navigate(['/myanalyses']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    AnalyseformComponent.prototype.back = function () {
        if (confirm('Quitter la page ?')) {
            this.router.navigate(['/mygroups']);
        }
    };
    AnalyseformComponent.prototype.setUser = function (user) {
        this.currentUser = user;
    };
    AnalyseformComponent.prototype.getMaxGrade = function () {
        return this.exercice.maxGradeVocab + this.exercice.maxGradeArgumentation
            + this.exercice.maxGradeExternalLinks + this.exercice.maxGradeGlobalIdee
            + this.exercice.maxGradeTrad + this.exercice.maxGradeGramar;
    };
    AnalyseformComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'analyseform.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            index_1.AnalyseService,
            index_1.ExerciceService,
            index_1.AlertService,
            router_1.ActivatedRoute,
            index_1.AuthenticationService])
    ], AnalyseformComponent);
    return AnalyseformComponent;
}());
exports.AnalyseformComponent = AnalyseformComponent;
//# sourceMappingURL=analyseform.component.js.map