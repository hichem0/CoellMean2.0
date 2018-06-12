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
var dbmodel_model_1 = require("../../util/dbmodel.model");
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var user_entity_1 = require("../user/user.entity");
var analyse_entity_1 = require("../analyse/analyse.entity");
var class_validator_1 = require("class-validator");
var group_entity_1 = require("../group/group.entity");
var Exercice = /** @class */ (function (_super) {
    __extends(Exercice, _super);
    function Exercice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxGradeVocab = 0;
        _this.maxGradeTrad = 0;
        _this.maxGradeGramar = 0;
        _this.maxGradeGlobalIdee = 0;
        _this.maxGradeArgumentation = 0;
        _this.maxGradeExternalLinks = 0;
        return _this;
    }
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column({ length: 500 }),
        __metadata("design:type", String)
    ], Exercice.prototype, "title", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], Exercice.prototype, "articleContenu", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: false }),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Exercice.prototype, "publishDate", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column({ length: 500 }),
        __metadata("design:type", String)
    ], Exercice.prototype, "source", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column({ length: 500 }),
        __metadata("design:type", String)
    ], Exercice.prototype, "domain", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column({ length: 500 }),
        __metadata("design:type", String)
    ], Exercice.prototype, "lang", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.Min(0),
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Exercice.prototype, "maxGradeVocab", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.Min(0),
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Exercice.prototype, "maxGradeTrad", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.Min(0),
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Exercice.prototype, "maxGradeGramar", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.Min(0),
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Exercice.prototype, "maxGradeGlobalIdee", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.Min(0),
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Exercice.prototype, "maxGradeArgumentation", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.Min(0),
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Exercice.prototype, "maxGradeExternalLinks", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_entity_1.User; }, function (user) { return user.exerciceCreated; }, { eager: true }),
        __metadata("design:type", user_entity_1.User)
    ], Exercice.prototype, "creator", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return analyse_entity_1.Analyse; }, function (analyse) { return analyse.exercice; }, { eager: true }),
        __metadata("design:type", Array)
    ], Exercice.prototype, "resolutions", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return group_entity_1.Group; }, function (group) { return group.exercices; }),
        __metadata("design:type", Array)
    ], Exercice.prototype, "groups", void 0);
    Exercice = __decorate([
        typeorm_1.Entity()
    ], Exercice);
    return Exercice;
}(dbmodel_model_1.DbAuditModel));
exports.Exercice = Exercice;
//# sourceMappingURL=exercise.entity.js.map