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
var http_1 = require("@angular/common/http");
var app_config_1 = require("../app.config");
var ExerciceService = /** @class */ (function () {
    function ExerciceService(http) {
        this.http = http;
    }
    ExerciceService.prototype.getAll = function () {
        return this.http.get(app_config_1.appConfig.apiUrl + '/exercices');
    };
    ExerciceService.prototype.getById = function (_id) {
        return this.http.get(app_config_1.appConfig.apiUrl + '/exercices/' + _id);
    };
    ExerciceService.prototype.create = function (exercice) {
        return this.http.post(app_config_1.appConfig.apiUrl + '/exercices/create', exercice);
    };
    ExerciceService.prototype.update = function (exercice) {
        return this.http.put(app_config_1.appConfig.apiUrl + '/exercices/' + exercice._id, exercice);
    };
    ExerciceService.prototype.delete = function (_id) {
        return this.http.delete(app_config_1.appConfig.apiUrl + '/exercices/' + _id);
    };
    ExerciceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ExerciceService);
    return ExerciceService;
}());
exports.ExerciceService = ExerciceService;
//# sourceMappingURL=exercice.service.js.map