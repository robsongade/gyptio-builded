"use strict";
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var typeorm_1 = require("typeorm");
var Module_1 = require("../entity/Module");
var ModuleController = /** @class */ (function () {
    function ModuleController() {
        var _this = this;
        this.list = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                global._permissions.check('module', 'list', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var moduleRepository;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!result) {
                                    return [2 /*return*/, response.status(200).json({
                                            error: {
                                                message: "Sem permissão"
                                            }
                                        })];
                                }
                                return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).find()];
                            case 1:
                                moduleRepository = _a.sent();
                                return [2 /*return*/, response.status(200).json({
                                        success: true,
                                        modules: moduleRepository
                                    })];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.delete = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                global._permissions.check('module', 'edit', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var id, module_1, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!result) {
                                    return [2 /*return*/, response.status(200).json({
                                            error: {
                                                message: "Sem permissão"
                                            }
                                        })];
                                }
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 4, , 5]);
                                id = request.params.id;
                                return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).findOne({
                                        where: {
                                            id: id
                                        }
                                    })];
                            case 2:
                                module_1 = _a.sent();
                                if (!module_1) {
                                    return [2 /*return*/, response.status(200).json({
                                            error: {
                                                message: "Modulo não encontrado!"
                                            }
                                        })];
                                }
                                return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).delete(id)];
                            case 3:
                                _a.sent();
                                return [2 /*return*/, response.status(200).json({
                                        success: true
                                    })];
                            case 4:
                                error_1 = _a.sent();
                                return [2 /*return*/, response.status(200).json({
                                        error: error_1
                                    })];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.load = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    global._permissions.check('module', 'edit', function (result) { return __awaiter(_this, void 0, void 0, function () {
                        var id, module;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!result) {
                                        return [2 /*return*/, response.status(200).json({
                                                error: {
                                                    message: "Sem permissão"
                                                }
                                            })];
                                    }
                                    id = request.params.id;
                                    return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).findOne({
                                            where: {
                                                id: id
                                            }
                                        })];
                                case 1:
                                    module = _a.sent();
                                    if (!module) {
                                        return [2 /*return*/, response.status(200).json({
                                                error: {
                                                    message: "Modulo não encontrado!"
                                                }
                                            })];
                                    }
                                    return [2 /*return*/, response.status(200).json({
                                            success: true,
                                            module: module
                                        })];
                            }
                        });
                    }); });
                }
                catch (error) {
                    return [2 /*return*/, response.status(200).json({
                            error: error
                        })];
                }
                return [2 /*return*/];
            });
        }); };
        this.create = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                global._permissions.check('module', 'create', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var module, name, description, code, findModule, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!result) {
                                    return [2 /*return*/, response.status(200).json({
                                            error: {
                                                message: "Sem permissão"
                                            }
                                        })];
                                }
                                module = request.body.module;
                                if (!module) {
                                    return [2 /*return*/, response.status(200).json({
                                            error: {
                                                message: "Infome o modulo"
                                            }
                                        })];
                                }
                                name = module.name, description = module.description, code = module.code;
                                return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).findOne({
                                        where: {
                                            code: code
                                        }
                                    })];
                            case 1:
                                findModule = _a.sent();
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 7, , 8]);
                                if (!findModule) return [3 /*break*/, 4];
                                return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).update(findModule.id, {
                                        name: name,
                                        description: description
                                    })];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 6];
                            case 4: return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).save({
                                    name: name,
                                    description: description,
                                    code: code
                                })];
                            case 5:
                                _a.sent();
                                _a.label = 6;
                            case 6: return [3 /*break*/, 8];
                            case 7:
                                error_2 = _a.sent();
                                return [2 /*return*/, response.status(200).json({
                                        error: error_2
                                    })];
                            case 8: return [2 /*return*/, response.status(200).json({
                                    success: true
                                })];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.edit = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                global._permissions.check('module', 'edit', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var module, name, description, code, id, findModule;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!result) {
                                    return [2 /*return*/, response.status(200).json({
                                            error: {
                                                message: "Sem permissão"
                                            }
                                        })];
                                }
                                module = request.body.module;
                                if (!module) {
                                    return [2 /*return*/, response.status(200).json({
                                            error: {
                                                message: "Infome o modulo"
                                            }
                                        })];
                                }
                                name = module.name, description = module.description, code = module.code, id = module.id;
                                return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).findOne({
                                        where: [
                                            {
                                                code: code
                                            },
                                            {
                                                id: id
                                            }
                                        ]
                                    })];
                            case 1:
                                findModule = _a.sent();
                                if (!findModule) return [3 /*break*/, 3];
                                return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).update(findModule.id, {
                                        name: name,
                                        description: description
                                    })];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/, response.status(200).json({
                                    success: true
                                })];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
    }
    return ModuleController;
}());
exports.ModuleController = ModuleController;
