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
var AnalyseService = /** @class */ (function () {
    function AnalyseService(http) {
        this.http = http;
    }
    AnalyseService.prototype.getAll = function () {
        return this.http.get(app_config_1.appConfig.apiUrl + '/analyses');
    };
    AnalyseService.prototype.getById = function (_id) {
        return this.http.get(app_config_1.appConfig.apiUrl + '/analyse/' + _id);
    };
    AnalyseService.prototype.create = function (analyse) {
        return this.http.post(app_config_1.appConfig.apiUrl + '/exo/' + analyse.idarticle + '/answer', analyse);
    };
    AnalyseService.prototype.grade = function (analyse) {
        return this.http.post(app_config_1.appConfig.apiUrl + '/analyse/' + analyse.idarticle + '/grade', analyse);
    };
    AnalyseService.prototype.delete = function (_id) {
        return this.http.delete(app_config_1.appConfig.apiUrl + '/analyses/' + _id);
    };
    AnalyseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AnalyseService);
    return AnalyseService;
}());
exports.AnalyseService = AnalyseService;
//# sourceMappingURL=analyse.service.js.map