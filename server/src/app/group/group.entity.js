"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var dbmodel_model_1 = require("../../util/dbmodel.model");
var user_entity_1 = require("../user/user.entity");
var exercise_entity_1 = require("../exercice/exercise.entity");
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column({ length: 500 }),
        __metadata("design:type", String)
    ], Group.prototype, "groupname", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.ManyToOne(function (type) { return user_entity_1.User; }, function (user) { return user.adminGroups; }, { eager: true }),
        __metadata("design:type", user_entity_1.User)
    ], Group.prototype, "admin", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.ManyToMany(function (type) { return user_entity_1.User; }, function (user) { return user.membeGroups; }, { eager: true }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Group.prototype, "users", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return exercise_entity_1.Exercice; }, function (exo) { return exo.groups; }, { eager: true }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Group.prototype, "exercices", void 0);
    Group = __decorate([
        typeorm_1.Entity()
    ], Group);
    return Group;
}(dbmodel_model_1.DbAuditModel));
exports.Group = Group;
//# sourceMappingURL=group.entity.js.map