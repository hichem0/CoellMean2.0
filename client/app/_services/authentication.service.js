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
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
var app_config_1 = require("../app.config");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post(app_config_1.appConfig.apiUrl + '/auth/token', { username: username, password: password })
            .mergeMap(function (token) {
            // login successful if there's a jwt token in the response
            if (token && token.access_token) {
                // store  jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('accessToken', JSON.stringify(token.access_token));
            }
            return _this.me();
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('accessToken');
        this.user = null;
        this.router.navigate(['/login']);
    };
    AuthenticationService.prototype.me = function () {
        var _this = this;
        return this.http.get(app_config_1.appConfig.apiUrl + '/auth/me')
            .map(function (user) {
            _this.user = user;
            return user;
        });
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map