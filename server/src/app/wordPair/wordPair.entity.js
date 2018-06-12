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
var class_validator_1 = require("class-validator");
var analyse_entity_1 = require("../analyse/analyse.entity");
var class_transformer_1 = require("class-transformer");
var WordPair = /** @class */ (function (_super) {
    __extends(WordPair, _super);
    function WordPair() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column({ length: 500 }),
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], WordPair.prototype, "key", void 0);
    __decorate([
        swagger_1.ApiModelProperty({ required: true }),
        typeorm_1.Column({ length: 500 }),
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], WordPair.prototype, "value", void 0);
    __decorate([
        class_transformer_1.Exclude(),
        typeorm_1.ManyToOne(function (type) { return analyse_entity_1.Analyse; }, function (analise) { return analise.vocabulaire; }, { cascadeRemove: true, cascadeAll: true }),
        __metadata("design:type", analyse_entity_1.Analyse)
    ], WordPair.prototype, "vocab", void 0);
    __decorate([
        class_transformer_1.Exclude(),
        typeorm_1.ManyToOne(function (type) { return analyse_entity_1.Analyse; }, function (analise) { return analise.tradution; }, { cascadeRemove: true, cascadeAll: true }),
        __metadata("design:type", analyse_entity_1.Analyse)
    ], WordPair.prototype, "trad", void 0);
    __decorate([
        class_transformer_1.Exclude(),
        typeorm_1.ManyToOne(function (type) { return analyse_entity_1.Analyse; }, function (analise) { return analise.grammaire; }, { cascadeRemove: true, cascadeAll: true }),
        __metadata("design:type", analyse_entity_1.Analyse)
    ], WordPair.prototype, "grammar", void 0);
    WordPair = __decorate([
        typeorm_1.Entity()
    ], WordPair);
    return WordPair;
}(dbmodel_model_1.DbAuditModel));
exports.WordPair = WordPair;
//# sourceMappingURL=wordPair.entity.js.map