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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Instance_1 = require("../../../entity/Instance");
var ServerGame_1 = require("../../../entity/modules/ServerGame/ServerGame");
var User_1 = require("../../../entity/User");
var GlobalData_1 = require("../../../libs/GlobalData");
var Auth_1 = __importDefault(require("../../Auth"));
var Permission_1 = __importDefault(require("../../Permission"));
var globa_data = new GlobalData_1.GlobalData();
exports.default = {
    player_validate_token: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.status(200).json({
                    success: true
                });
                return [2 /*return*/];
            });
        });
    },
    validate_token: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user, findUser, findInstanceMaster, findServers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = globa_data.Storage().user;
                        console.log("validate_token user:::", user, globa_data.Storage());
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({
                                where: {
                                    id: user.id
                                }
                            })];
                    case 1:
                        findUser = _a.sent();
                        if (!findUser) {
                            return [2 /*return*/, response.status(200).json({
                                    error: {
                                        message: 'findUser'
                                    }
                                })];
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne({
                                where: {
                                    user: findUser,
                                    type: 'master'
                                }
                            })];
                    case 2:
                        findInstanceMaster = _a.sent();
                        if (!findInstanceMaster) {
                            return [2 /*return*/, response.status(200).json({
                                    error: {
                                        message: 'findInstanceMaster'
                                    }
                                })];
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(ServerGame_1.ServerGame).find({
                                where: {}
                            })];
                    case 3:
                        findServers = _a.sent();
                        if (!findServers) {
                            return [2 /*return*/, response.status(200).json({
                                    error: {
                                        message: 'findServers'
                                    }
                                })];
                        }
                        response.status(200).json({
                            success: true,
                            servers: findServers
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    create: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Permission_1.default.set_request(request).check_permission('server_game', 'create', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, instance, user, _b, servergame, instance_id, findInstance, findInstance, name, description, status, e_1;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!result) {
                                    return [2 /*return*/, response.send({
                                            error: {
                                                message: "error permission"
                                            }
                                        })];
                                }
                                return [4 /*yield*/, Auth_1.default.storage()
                                    //TODO: check instance server
                                ];
                            case 1:
                                _a = _c.sent(), instance = _a.instance, user = _a.user;
                                _b = request.body, servergame = _b.servergame, instance_id = _b.instance_id;
                                if (!servergame.instance_id) return [3 /*break*/, 3];
                                return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne({
                                        where: {
                                            instance_id: instance,
                                            type: 'master'
                                        }
                                    })];
                            case 2:
                                findInstance = _c.sent();
                                _c.label = 3;
                            case 3:
                                if (!findInstance) return [3 /*break*/, 4];
                                instance_id = servergame.instance_id;
                                return [3 /*break*/, 6];
                            case 4: return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne({
                                    where: {
                                        instance_id: instance
                                    }
                                })];
                            case 5:
                                findInstance = _c.sent();
                                if (findInstance) {
                                    instance_id = findInstance.id;
                                }
                                _c.label = 6;
                            case 6:
                                name = servergame.name, description = servergame.description, status = servergame.status;
                                _c.label = 7;
                            case 7:
                                _c.trys.push([7, 9, , 10]);
                                return [4 /*yield*/, typeorm_1.getRepository(ServerGame_1.ServerGame).save({
                                        name: name, description: description, status: status,
                                        instance_id: instance_id
                                    })];
                            case 8:
                                _c.sent();
                                response.send({
                                    success: true
                                });
                                return [3 /*break*/, 10];
                            case 9:
                                e_1 = _c.sent();
                                response.send({
                                    error: {
                                        message: "Internal error : " + e_1.message,
                                        user: user, findInstance: findInstance
                                    }
                                });
                                return [3 /*break*/, 10];
                            case 10: return [2 /*return*/];
                        }
                    });
                }); }, true);
                return [2 /*return*/];
            });
        });
    },
    edit: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Permission_1.default.set_request(request).check_permission('server_game', 'edit', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, servergame, instance_id, name, description, id, status, instance, findInstance, e_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!result) {
                                    return [2 /*return*/, response.send({
                                            error: {
                                                message: "error permission"
                                            }
                                        })];
                                }
                                _a = request.body, servergame = _a.servergame, instance_id = _a.instance_id;
                                name = servergame.name, description = servergame.description, id = servergame.id, status = servergame.status;
                                return [4 /*yield*/, Auth_1.default.storage()];
                            case 1:
                                instance = (_b.sent()).instance;
                                if (!servergame.instance_id) return [3 /*break*/, 3];
                                return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne({
                                        where: {
                                            instance_id: instance,
                                            type: 'master'
                                        }
                                    })];
                            case 2:
                                findInstance = _b.sent();
                                _b.label = 3;
                            case 3:
                                if (findInstance) {
                                    instance_id = servergame.instance_id;
                                }
                                else {
                                    instance_id = false;
                                }
                                _b.label = 4;
                            case 4:
                                _b.trys.push([4, 9, , 10]);
                                if (!instance_id) return [3 /*break*/, 6];
                                return [4 /*yield*/, typeorm_1.getRepository(ServerGame_1.ServerGame).update(id, {
                                        name: name, description: description, status: status, instance_id: instance_id
                                    })];
                            case 5:
                                _b.sent();
                                return [3 /*break*/, 8];
                            case 6: return [4 /*yield*/, typeorm_1.getRepository(ServerGame_1.ServerGame).update(id, {
                                    name: name, description: description, status: status
                                })];
                            case 7:
                                _b.sent();
                                _b.label = 8;
                            case 8: return [3 /*break*/, 10];
                            case 9:
                                e_2 = _b.sent();
                                response.send({
                                    error: {
                                        message: "Internal error : " + e_2.message
                                    }
                                });
                                return [3 /*break*/, 10];
                            case 10:
                                response.send({
                                    success: true, findInstance: findInstance
                                });
                                return [2 /*return*/];
                        }
                    });
                }); }, true);
                return [2 /*return*/];
            });
        });
    },
    status: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var server_status, status_default, i, status;
            return __generator(this, function (_a) {
                server_status = [];
                status_default = {};
                for (i in ServerGame_1.ServerGameStatus) {
                    status = {
                        value: i,
                        name: ServerGame_1.ServerGameStatus[i]
                    };
                    if (status.name == ServerGame_1.ServerGameStatus.OFF) {
                        status_default = status;
                    }
                    server_status.push(status);
                }
                response.send({
                    success: true,
                    server_status: server_status,
                    status_default: status_default
                });
                return [2 /*return*/];
            });
        });
    },
    delete: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Permission_1.default.set_request(request).check_permission('server_game', 'delete', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var id, instance, findInstance, findInstanceMaster;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!result) {
                                    return [2 /*return*/, response.send({
                                            error: {
                                                message: "error permission"
                                            }
                                        })];
                                }
                                id = request.params.id;
                                return [4 /*yield*/, Auth_1.default.storage()];
                            case 1:
                                instance = (_a.sent()).instance;
                                return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne({
                                        where: {
                                            instance_id: instance,
                                            id: id
                                        }
                                    })];
                            case 2:
                                findInstance = _a.sent();
                                if (!findInstance) return [3 /*break*/, 4];
                                return [4 /*yield*/, typeorm_1.getRepository(ServerGame_1.ServerGame).delete(id)];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 7];
                            case 4: return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne({
                                    where: {
                                        instance_id: instance,
                                        type: 'master'
                                    }
                                })];
                            case 5:
                                findInstanceMaster = _a.sent();
                                if (!findInstanceMaster) return [3 /*break*/, 7];
                                return [4 /*yield*/, typeorm_1.getRepository(ServerGame_1.ServerGame).delete(id)];
                            case 6:
                                _a.sent();
                                _a.label = 7;
                            case 7:
                                response.send({
                                    success: true
                                });
                                return [2 /*return*/];
                        }
                    });
                }); }, true);
                return [2 /*return*/];
            });
        });
    },
    list: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Permission_1.default.set_request(request).check_permission('server_game', 'list', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var instance, findInstance, findInstanceMaster, findServers, findServers;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!result) {
                                    return [2 /*return*/, response.send({
                                            error: {
                                                message: "error permission"
                                            }
                                        })];
                                }
                                return [4 /*yield*/, Auth_1.default.storage()];
                            case 1:
                                instance = (_a.sent()).instance;
                                return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne({
                                        where: {
                                            instance_id: instance
                                        }
                                    })];
                            case 2:
                                findInstance = _a.sent();
                                return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne({
                                        where: {
                                            instance_id: instance,
                                            type: 'master'
                                        }
                                    })];
                            case 3:
                                findInstanceMaster = _a.sent();
                                if (!findInstanceMaster) return [3 /*break*/, 5];
                                return [4 /*yield*/, typeorm_1.getRepository(ServerGame_1.ServerGame).find()];
                            case 4:
                                findServers = _a.sent();
                                return [3 /*break*/, 7];
                            case 5: return [4 /*yield*/, typeorm_1.getRepository(ServerGame_1.ServerGame).find({
                                    where: {
                                        instance_id: findInstance.id
                                    }
                                })];
                            case 6:
                                findServers = _a.sent();
                                _a.label = 7;
                            case 7:
                                response.send({
                                    servergame: findServers
                                });
                                return [2 /*return*/];
                        }
                    });
                }); }, true);
                return [2 /*return*/];
            });
        });
    },
    loadById: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Permission_1.default.set_request(request).check_permission('server_game', 'show', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var id, findServers, server_status, i, status;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!result) {
                                    return [2 /*return*/, response.send({
                                            error: {
                                                message: "error permission"
                                            }
                                        })];
                                }
                                id = request.params.id;
                                return [4 /*yield*/, typeorm_1.getRepository(ServerGame_1.ServerGame).findOne({
                                        where: {
                                            id: id
                                        }
                                    })];
                            case 1:
                                findServers = _a.sent();
                                server_status = [];
                                for (i in ServerGame_1.ServerGameStatus) {
                                    status = {
                                        value: i,
                                        name: ServerGame_1.ServerGameStatus[i]
                                    };
                                    server_status.push(status);
                                }
                                response.send({
                                    servergame: findServers,
                                    server_status: server_status
                                });
                                return [2 /*return*/];
                        }
                    });
                }); }, true);
                return [2 /*return*/];
            });
        });
    }
};
