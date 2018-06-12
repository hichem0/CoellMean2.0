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
var authority_entity_1 = require("../authority/authority.entity");
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var dbmodel_model_1 = require("../../util/dbmodel.model");
var group_entity_1 = require("../group/group.entity");
var exercise_entity_1 = require("../exercice/exercise.entity");
var analyse_entity_1 = require("../analyse/analyse.entity");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column({ length: 500 }),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column({ length: 500 }),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column(),
        class_transformer_1.Exclude(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return authority_entity_1.Authority; }, function (authority) { return authority.users; }, {
            eager: true,
            cascadeUpdate: true,
        }),
        swagger_1.ApiModelProperty({ isArray: true, type: authority_entity_1.Authority }),
        typeorm_1.JoinTable(),
        class_transformer_1.Type(function () { return authority_entity_1.Authority; }),
        __metadata("design:type", Array)
    ], User.prototype, "authority", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return group_entity_1.Group; }, function (group) { return group.admin; }),
        __metadata("design:type", Array)
    ], User.prototype, "adminGroups", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return group_entity_1.Group; }, function (group) { return group.users; }),
        __metadata("design:type", Array)
    ], User.prototype, "membeGroups", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return exercise_entity_1.Exercice; }, function (exo) { return exo.creator; }),
        __metadata("design:type", Array)
    ], User.prototype, "exerciceCreated", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return analyse_entity_1.Analyse; }, function (analyse) { return analyse.user; }),
        __metadata("design:type", analyse_entity_1.Analyse)
    ], User.prototype, "analyses", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}(dbmodel_model_1.DbAuditModel));
exports.User = User;
//# sourceMappingURL=user.entity.js.map