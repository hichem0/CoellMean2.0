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
    function GroupdetailsComponent(groupService, route, alertService, router, authService, activatedRoute) {
        this.groupService = groupService;
        this.route = route;
        this.alertService = alertService;
        this.router = router;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.loading = false;
    }
    GroupdetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getGroup();
        this.route.queryParams
            .filter(function (params) { return params.groupname; })
            .subscribe(function (params) {
            _this.groupName = params.groupname;
        });
        this.authService.me().subscribe(function (user) {
            _this.setUser(user);
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
    GroupdetailsComponent.prototype.addUserAtGroup = function (username) {
        var _this = this;
        this.group.users.push(this.users.find(function (user) {
            return user.username === username;
        }));
        this.groupService.update(this.group)
            .subscribe(function (data) {
            _this.alertService.success(username + ' ajouté au groupe', true);
            _this.goToGroupDetails(_this.group.groupname);
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
            _this.goToGroupDetails(_this.group.groupname);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    GroupdetailsComponent.prototype.goToGroupDetails = function (groupname) {
        var queryParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
        queryParams['groupname'] = groupname;
        this.router.navigate(['/group'], { queryParams: queryParams });
    };
    GroupdetailsComponent.prototype.userInGroup = function (username) {
        if (username === this.group.admin.username) {
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
    GroupdetailsComponent.prototype.deleteGroup = function () {
        var _this = this;
        if (confirm("Confirmer la suppresion du group ? ")) {
            this.groupService.delete(this.group.id).subscribe(function () { _this.router.navigate(['/mygroups']); });
        }
    };
    GroupdetailsComponent.prototype.join = function () {
        var _this = this;
        this.groupService.joinGroup(this.group)
            .subscribe(function (data) {
            _this.alertService.success('Vous avez rejoint le groupe', true);
            _this.group.users.push(_this.currentUser);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    GroupdetailsComponent.prototype.leave = function () {
        var _this = this;
        if (confirm('Confirmer le départ du groupe ?')) {
            this.groupService.leaveGroup(this.group)
                .subscribe(function (data) {
                _this.router.navigate(['/mygroups']);
            }, function (error) {
                //this.alertService.error(error);
                _this.loading = false;
            });
        }
    };
    GroupdetailsComponent.prototype.back = function () {
        this.router.navigate(['/mygroups']);
    };
    GroupdetailsComponent.prototype.beMember = function () {
        var flag = false;
        for (var _i = 0, _a = this.group.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.username === this.currentUser.username) {
                flag = true;
            }
        }
        return flag;
    };
    GroupdetailsComponent.prototype.setUser = function (user) {
        this.currentUser = user;
    };
    GroupdetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'groupdetails.component.html'
        }),
        __metadata("design:paramtypes", [index_1.GroupService,
            router_1.ActivatedRoute,
            index_1.AlertService,
            router_1.Router,
            index_1.AuthenticationService,
            router_1.ActivatedRoute])
    ], GroupdetailsComponent);
    return GroupdetailsComponent;
}());
exports.GroupdetailsComponent = GroupdetailsComponent;
//# sourceMappingURL=groupdetails.component.js.map