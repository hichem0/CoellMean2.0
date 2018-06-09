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
var MygroupsComponent = /** @class */ (function () {
    function MygroupsComponent(groupService, router, activatedRoute, authenticationService) {
        this.groupService = groupService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.authenticationService = authenticationService;
        this.groups = [];
    }
    MygroupsComponent.prototype.ngOnInit = function () {
        this.loadAllGroups();
        this.currentUser = this.authenticationService.user;
    };
    MygroupsComponent.prototype.loadAllGroups = function () {
        var _this = this;
        this.groupService.getAll().subscribe(function (groups) { _this.groups = groups; });
    };
    MygroupsComponent.prototype.goToGroupDetails = function (groupname) {
        var queryParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
        queryParams['groupname'] = groupname;
        this.router.navigate(['/group'], { queryParams: queryParams });
    };
    MygroupsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'mygroups.component.html'
        }),
        __metadata("design:paramtypes", [index_1.GroupService,
            router_1.Router,
            router_1.ActivatedRoute,
            index_1.AuthenticationService])
    ], MygroupsComponent);
    return MygroupsComponent;
}());
exports.MygroupsComponent = MygroupsComponent;
//# sourceMappingURL=mygroups.component.js.map