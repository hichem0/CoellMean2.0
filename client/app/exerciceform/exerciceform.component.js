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
var ExerciceformComponent = /** @class */ (function () {
    function ExerciceformComponent(router, exerciceService, alertService, authenticationService) {
        this.router = router;
        this.exerciceService = exerciceService;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.exercice = {};
        this.loading = false;
    }
    ExerciceformComponent.prototype.ngOnInit = function () {
        this.currentUser = this.authenticationService.user;
    };
    ExerciceformComponent.prototype.createExercice = function () {
        var _this = this;
        this.loading = true;
        this.exercice.createur = this.currentUser.username;
        this.exerciceService.create(this.exercice)
            .subscribe(function (data) {
            _this.alertService.success('Création réussie', true);
            _this.router.navigate(['/myexercices']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    ExerciceformComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'exerciceform.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            index_1.ExerciceService,
            index_1.AlertService,
            index_1.AuthenticationService])
    ], ExerciceformComponent);
    return ExerciceformComponent;
}());
exports.ExerciceformComponent = ExerciceformComponent;
//# sourceMappingURL=exerciceform.component.js.map