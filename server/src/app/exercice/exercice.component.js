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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var typescript_optional_1 = require("typescript-optional");
var typeorm_1 = require("typeorm");
var exercise_entity_1 = require("./exercise.entity");
var typeorm_2 = require("@nestjs/typeorm");
var group_service_1 = require("../group/group.service");
var utils_1 = require("../utils");
var ExerciceService = /** @class */ (function () {
    function ExerciceService(exerciseRepository, groupService) {
        this.exerciseRepository = exerciseRepository;
        this.groupService = groupService;
    }
    ExerciceService.prototype.createExerice = function (exo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.exerciseRepository.save(exo)];
            });
        });
    };
    ExerciceService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.exerciseRepository.find()];
            });
        });
    };
    ExerciceService.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var exo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exerciseRepository.findOne({ id: id })];
                    case 1:
                        exo = _a.sent();
                        // const exo = await this.exerciseRepository.findOne({ where: { id }, relations: ['']});
                        return [2 /*return*/, typescript_optional_1.default.ofNullable(exo)];
                }
            });
        });
    };
    ExerciceService.prototype.delete = function (exoId) {
        return __awaiter(this, void 0, void 0, function () {
            var exo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findById(exoId)];
                    case 1:
                        exo = (_a.sent()).orElseThrow(function () { return new common_1.NotFoundException(); });
                        return [4 /*yield*/, this.exerciseRepository.remove(exo)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExerciceService.prototype.linkToGroup = function (exoId, groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var group, exo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupService.findById(groupId)];
                    case 1:
                        group = (_a.sent()).orElseThrow(function () { return new common_1.NotFoundException(); });
                        return [4 /*yield*/, this.findById(exoId)];
                    case 2:
                        exo = (_a.sent()).orElseThrow(function () { return new common_1.NotFoundException(); });
                        group.exercices = group.exercices.concat([exo]).filter(utils_1.uniqFilter);
                        return [4 /*yield*/, this.groupService.save(group)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.findById(exoId)];
                    case 4: return [2 /*return*/, (_a.sent()).orElseThrow(function () { return new common_1.NotFoundException(); })];
                }
            });
        });
    };
    ExerciceService.prototype.unlinkToGroup = function (exoId, groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupService.findById(groupId)];
                    case 1:
                        group = (_a.sent()).orElseThrow(function () { return new common_1.NotFoundException(); });
                        group.exercices = group.exercices.filter(function (x) { return x.id !== exoId; });
                        return [4 /*yield*/, this.groupService.save(group)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.findById(exoId)];
                    case 3: return [2 /*return*/, (_a.sent()).orElseThrow(function () { return new common_1.NotFoundException(); })];
                }
            });
        });
    };
    ExerciceService = __decorate([
        common_1.Component(),
        __param(0, typeorm_2.InjectRepository(exercise_entity_1.Exercice)),
        __metadata("design:paramtypes", [typeorm_1.Repository,
            group_service_1.GroupService])
    ], ExerciceService);
    return ExerciceService;
}());
exports.ExerciceService = ExerciceService;
//# sourceMappingURL=exercice.component.js.map