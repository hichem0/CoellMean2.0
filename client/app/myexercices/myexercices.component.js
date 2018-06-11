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
var index_1 = require("../_services/index");
var router_1 = require("@angular/router");
var MyexercicesComponent = /** @class */ (function () {
    function MyexercicesComponent(exerciceService, router, activatedRoute, authenticationService) {
        this.exerciceService = exerciceService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.authenticationService = authenticationService;
        this.exercices = [];
    }
    MyexercicesComponent.prototype.ngOnInit = function () {
        this.loadAllExercices();
        this.currentUser = this.authenticationService.user;
    };
    MyexercicesComponent.prototype.deleteExercice = function (_id) {
        var _this = this;
        this.exerciceService.delete(_id).subscribe(function () { _this.loadAllExercices(); });
    };
    MyexercicesComponent.prototype.loadAllExercices = function () {
        var _this = this;
        this.exerciceService.getAll().subscribe(function (exercices) { _this.exercices = exercices; });
    };
    MyexercicesComponent.prototype.goToExerciceDetails = function (titre) {
        var queryParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
        queryParams['titre'] = titre;
        this.router.navigate(['/exercice'], { queryParams: queryParams });
    };
    MyexercicesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'myexercices.component.html'
        }),
        __metadata("design:paramtypes", [index_1.ExerciceService,
            router_1.Router,
            router_1.ActivatedRoute,
            index_1.AuthenticationService])
    ], MyexercicesComponent);
    return MyexercicesComponent;
}());
exports.MyexercicesComponent = MyexercicesComponent;
//# sourceMappingURL=myexercices.component.js.map