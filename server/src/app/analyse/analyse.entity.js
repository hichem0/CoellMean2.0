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
var user_entity_1 = require("../user/user.entity");
var wordPair_entity_1 = require("../wordPair/wordPair.entity");
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var exercise_entity_1 = require("../exercice/exercise.entity");
var Analyse = /** @class */ (function (_super) {
    __extends(Analyse, _super);
    function Analyse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.argumentationScore = 0;
        _this.vocabulaireScore = 0;
        _this.traductionScore = 0;
        _this.grammaireScore = 0;
        _this.igScore = 0;
        _this.liensExterneScore = 0;
        _this.totalScore = -1;
        return _this;
    }
    __decorate([
        typeorm_1.ManyToOne(function (type) { return exercise_entity_1.Exercice; }, function (exo) { return exo.resolutions; }),
        __metadata("design:type", exercise_entity_1.Exercice)
    ], Analyse.prototype, "exercice", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], Analyse.prototype, "langue", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], Analyse.prototype, "argumentation", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true, type: wordPair_entity_1.WordPair, isArray: true }),
        typeorm_1.OneToMany(function (type) { return wordPair_entity_1.WordPair; }, function (pair) { return pair.vocab; }, { eager: true }),
        __metadata("design:type", Array)
    ], Analyse.prototype, "vocabulaire", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true, type: wordPair_entity_1.WordPair, isArray: true }),
        typeorm_1.OneToMany(function (type) { return wordPair_entity_1.WordPair; }, function (pair) { return pair.trad; }, { eager: true }),
        __metadata("design:type", Array)
    ], Analyse.prototype, "tradution", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true, type: wordPair_entity_1.WordPair, isArray: true }),
        typeorm_1.OneToMany(function (type) { return wordPair_entity_1.WordPair; }, function (pair) { return pair.grammar; }, { eager: true }),
        __metadata("design:type", Array)
    ], Analyse.prototype, "grammaire", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('text', { isArray: true }),
        __metadata("design:type", Array)
    ], Analyse.prototype, "globalIdea", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('text', { isArray: true }),
        __metadata("design:type", Array)
    ], Analyse.prototype, "liensExterne", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Analyse.prototype, "argumentationScore", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Analyse.prototype, "vocabulaireScore", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Analyse.prototype, "traductionScore", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Analyse.prototype, "grammaireScore", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Analyse.prototype, "igScore", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Analyse.prototype, "liensExterneScore", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: false }),
        typeorm_1.Column('real'),
        __metadata("design:type", Number)
    ], Analyse.prototype, "totalScore", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_entity_1.User; }, function (user) { return user.analyses; }),
        __metadata("design:type", user_entity_1.User)
    ], Analyse.prototype, "user", void 0);
    Analyse = __decorate([
        typeorm_1.Entity()
    ], Analyse);
    return Analyse;
}(dbmodel_model_1.DbAuditModel));
exports.Analyse = Analyse;
//# sourceMappingURL=analyse.entity.js.map