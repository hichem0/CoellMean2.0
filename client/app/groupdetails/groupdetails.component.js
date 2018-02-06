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
require("rxjs/add/operator/filter");
var GroupdetailsComponent = /** @class */ (function () {
    function GroupdetailsComponent(groupService, userService, route, alertService, router) {
        this.groupService = groupService;
        this.userService = userService;
        this.route = route;
        this.alertService = alertService;
        this.router = router;
        this.loading = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    GroupdetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getGroup();
        this.loadAllUsers();
        this.route.queryParams
            .filter(function (params) { return params.groupname; })
            .subscribe(function (params) {
            _this.groupName = params.groupname;
        });
    };
    GroupdetailsComponent.prototype.getGroup = function () {
        var _this = this;
        this.groupService.getAll().subscribe(function (groups) {
            for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
                var group = groups_1[_i];
                if (group.groupname === _this.groupName) {
                    _this.group = group;
                }
            }
        });
    };
    GroupdetailsComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { _this.users = users; });
    };
    GroupdetailsComponent.prototype.addUserAtGroup = function (username) {
        var _this = this;
        this.group.users.push(this.users.find(function (user) {
            return user.username === username;
        }));
        this.groupService.update(this.group)
            .subscribe(function (data) {
            _this.alertService.success(username + ' ajouté au groupe', true);
            _this.router.navigate(['/group', { groupname: _this.groupName }]);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    GroupdetailsComponent.prototype.deleteUserAtGroup = function (username) {
        var _this = this;
        this.group.users = this.group.users.filter(function (user) { return user.username !== username; });
        this.groupService.update(this.group)
            .subscribe(function (data) {
            _this.alertService.success(username + ' supprimé au groupe', true);
            _this.router.navigate(['/group', { groupname: _this.groupName }]);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    GroupdetailsComponent.prototype.userInGroup = function (username) {
        if (username === this.group.adminname) {
            return true;
        }
        for (var _i = 0, _a = this.group.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.username === username) {
                return true;
            }
        }
        return false;
    };
    GroupdetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'groupdetails.component.html'
        }),
        __metadata("design:paramtypes", [index_1.GroupService,
            index_1.UserService,
            router_1.ActivatedRoute,
            index_1.AlertService,
            router_1.Router])
    ], GroupdetailsComponent);
    return GroupdetailsComponent;
}());
exports.GroupdetailsComponent = GroupdetailsComponent;
//# sourceMappingURL=groupdetails.component.js.map