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
var AnalyseformComponent = /** @class */ (function () {
    function AnalyseformComponent(router, analyseService, exerciceService, alertService, route, authenticationService) {
        this.router = router;
        this.analyseService = analyseService;
        this.exerciceService = exerciceService;
        this.alertService = alertService;
        this.route = route;
        this.authenticationService = authenticationService;
        this.analyse = {};
        this.loading = false;
    }
    AnalyseformComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams
            .filter(function (params) { return params.id; })
            .subscribe(function (params) {
            _this.analyse.idarticle = params.id;
            _this.loadExercice();
        });
        this.vocabulaire = [];
        this.traduction = [];
        this.grammaire = [];
        this.ideeGlobales = [];
        this.liens = [];
        this.currentUser = this.authenticationService.user;
    };
    AnalyseformComponent.prototype.loadExercice = function () {
        var _this = this;
        this.exerciceService.getById(this.analyse.idarticle)
            .subscribe(function (data) {
            _this.exercice = data;
        });
    };
    AnalyseformComponent.prototype.addVoc = function () {
        if (this.motS !== "" && this.syn !== "") {
            this.paire = { mot1: this.motS, mot2: this.syn };
            this.vocabulaire.push(this.paire);
            this.motS = "";
            this.syn = "";
        }
    };
    AnalyseformComponent.prototype.addTrad = function () {
        if (this.motT !== "" && this.trad !== "") {
            this.paire = { mot1: this.motT, mot2: this.trad };
            this.traduction.push(this.paire);
            this.motT = "";
            this.trad = "";
        }
    };
    AnalyseformComponent.prototype.addGramm = function () {
        if (this.motG !== "" && this.anaG !== "") {
            this.paire = { mot1: this.motG, mot2: this.anaG };
            this.grammaire.push(this.paire);
            this.motG = "";
            this.anaG = "";
        }
    };
    AnalyseformComponent.prototype.addIG = function () {
        if (this.ig !== "") {
            this.ideeGlobales.push(this.ig);
            this.ig = "";
        }
    };
    AnalyseformComponent.prototype.addLink = function () {
        if (this.lien !== "") {
            this.liens.push(this.lien);
            this.lien = "";
        }
    };
    AnalyseformComponent.prototype.createAnalyse = function () {
        var _this = this;
        this.loading = true;
        this.analyse.createur = this.currentUser.username;
        this.analyse.vocabulaire = this.vocabulaire;
        this.analyse.traduction = this.traduction;
        this.analyse.groupName = this.grammaire;
        this.analyse.ig = this.ideeGlobales;
        this.analyse.liensExterne = this.liens;
        this.analyseService.create(this.analyse)
            .subscribe(function (data) {
            _this.alertService.success('Analyse remise pour correction', true);
            _this.router.navigate(['/myanalyses']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
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