"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var InstanceRelation_1 = require("../../../../entity/InstanceRelation");
var NetworkUser_1 = require("../../../../entity/modules/NetworkUser/NetworkUser");
var Network3x3 = /** @class */ (function () {
    function Network3x3() {
        this.nivels = 6;
        this.last_reference_id_up = 0;
        this.amountByNivel = 2;
    }
    Network3x3.prototype.apply_completeds = function (network) {
        return __awaiter(this, void 0, void 0, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkUser_1.NetworkUser.getRepository()
                            .createQueryBuilder('log_entry')
                            .where("status != 'COMPLETED'")
                            .select('COUNT(`id`) GROUND BY referenceUser').getCount()];
                    case 1:
                        count = _a.sent();
                        console.log(count);
                        return [2 /*return*/];
                }
            });
        });
    };
    Network3x3.prototype.apply_user = function (indicator, network) {
        return __awaiter(this, void 0, void 0, function () {
            var findReferenceNetwork, referenceNetwork, findFirst, referenceNetwork;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                            where: {
                                currentUser: indicator.referenceUserId,
                                status: typeorm_1.Not(typeorm_1.Equal(NetworkUser_1.NetworkUserStatus.completed))
                            }
                        })];
                    case 1:
                        findReferenceNetwork = _a.sent();
                        if (!findReferenceNetwork) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getReferenceNetwork(indicator)];
                    case 2:
                        referenceNetwork = _a.sent();
                        if (!referenceNetwork) return [3 /*break*/, 4];
                        console.log(referenceNetwork);
                        return [4 /*yield*/, this.register(referenceNetwork.nivel + 1, referenceNetwork.nivel_global + 1, indicator.indicatorUserId, indicator.referenceUserId, network)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 11];
                    case 5: return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne()];
                    case 6:
                        findFirst = _a.sent();
                        if (!!findFirst) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.register_first(indicator.indicatorUserId, null, network)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 8: return [4 /*yield*/, this.getReferenceNetworkUp(indicator)];
                    case 9:
                        referenceNetwork = _a.sent();
                        if (!referenceNetwork) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.register(referenceNetwork.nivel + 1, referenceNetwork.nivel_global + 1, indicator.indicatorUserId, referenceNetwork.currentUserId, network)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    Network3x3.prototype.getReferenceNetwork = function (reference) {
        return __awaiter(this, void 0, void 0, function () {
            var findReference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                            where: {
                                currentUser: reference.referenceUserId,
                                status: typeorm_1.Not(typeorm_1.Equal(NetworkUser_1.NetworkUserStatus.completed))
                            }
                        })];
                    case 1:
                        findReference = _a.sent();
                        return [2 /*return*/, findReference];
                }
            });
        });
    };
    Network3x3.prototype.getReferenceNetworkUp = function (reference) {
        return __awaiter(this, void 0, void 0, function () {
            var findReference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                            where: {
                                referenceUser: reference.referenceUserId,
                                status: typeorm_1.Not(typeorm_1.Equal(NetworkUser_1.NetworkUserStatus.completed))
                            }
                        })];
                    case 1:
                        findReference = _a.sent();
                        return [2 /*return*/, findReference];
                }
            });
        });
    };
    Network3x3.prototype.register_first = function (currentUser, referenceUser, network) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkUser_1.NetworkUser.create({
                            nivel: 1,
                            nivel_global: 1,
                            currentUser: currentUser,
                            referenceUser: referenceUser,
                            network: network
                        }).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Network3x3.prototype.register = function (nivel, nivel_global, currentUser, referenceUser, network) {
        return __awaiter(this, void 0, void 0, function () {
            var checkNivel, count, findNivelGlonal, findNetworkId, findNetworkId, id, findReferenceDown, findReferenceUserDown, x, findReferenceUp, findReferenceUserUp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkUser_1.NetworkUser
                            .find({
                            where: {
                                referenceUser: referenceUser,
                                nivel: 1
                            }
                        })];
                    case 1:
                        checkNivel = _a.sent();
                        count = 0;
                        checkNivel.forEach(function () {
                            count++;
                        });
                        if (!(count <= this.amountByNivel)) return [3 /*break*/, 7];
                        return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                                where: {
                                    currentUser: referenceUser,
                                    nivel: 1
                                }
                            })];
                    case 2:
                        findNivelGlonal = _a.sent();
                        if (!findNivelGlonal) {
                            nivel_global = -1;
                        }
                        else {
                            nivel_global = findNivelGlonal.nivel_global + 1;
                        }
                        return [4 /*yield*/, NetworkUser_1.NetworkUser.create({
                                nivel: 1,
                                nivel_global: nivel_global,
                                currentUser: currentUser,
                                referenceUser: referenceUser,
                                network: network
                            }).save()];
                    case 3:
                        _a.sent();
                        if (!(count + 1 >= this.amountByNivel)) return [3 /*break*/, 6];
                        return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                                where: {
                                    currentUser: referenceUser
                                }
                            })];
                    case 4:
                        findNetworkId = _a.sent();
                        return [4 /*yield*/, NetworkUser_1.NetworkUser.update(findNetworkId.id, {
                                status: NetworkUser_1.NetworkUserStatus.completed
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 14];
                    case 7: return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                            where: {
                                currentUser: referenceUser
                            }
                        })];
                    case 8:
                        findNetworkId = _a.sent();
                        id = findNetworkId.id;
                        return [4 /*yield*/, NetworkUser_1.NetworkUser.update(findNetworkId.id, {
                                status: NetworkUser_1.NetworkUserStatus.completed
                            })];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.getReferenceDown(referenceUser)];
                    case 10:
                        findReferenceDown = _a.sent();
                        if (!findReferenceDown) return [3 /*break*/, 13];
                        return [4 /*yield*/, InstanceRelation_1.InstanceRelation.findOne({
                                where: {
                                    id: findReferenceDown.currentUserId
                                }
                            })];
                    case 11:
                        findReferenceUserDown = _a.sent();
                        return [4 /*yield*/, this.createDown(1, nivel_global + 1, currentUser, findReferenceUserDown, network)];
                    case 12:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        process.exit();
                        _a.label = 14;
                    case 14:
                        x = 2;
                        _a.label = 15;
                    case 15:
                        if (!(x <= this.nivels)) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.getReferenceUp(referenceUser, x)];
                    case 16:
                        findReferenceUp = _a.sent();
                        if (!findReferenceUp) return [3 /*break*/, 19];
                        return [4 /*yield*/, InstanceRelation_1.InstanceRelation.findOne({
                                where: {
                                    id: findReferenceUp.referenceUserId
                                }
                            })];
                    case 17:
                        findReferenceUserUp = _a.sent();
                        this.last_reference_id_up = findReferenceUp.referenceUserId;
                        console.log("findReferenceUp", findReferenceUserUp, findReferenceUp, referenceUser, x);
                        return [4 /*yield*/, this.createUp(x, nivel_global + 1, currentUser, findReferenceUserUp, network)];
                    case 18:
                        _a.sent();
                        return [3 /*break*/, 20];
                    case 19:
                        console.log("!findReferenceUp" + x);
                        _a.label = 20;
                    case 20:
                        x++;
                        return [3 /*break*/, 15];
                    case 21:
                        if (currentUser == 25) {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Network3x3.prototype.getReferenceUp = function (referenceUser, nivel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                            where: {
                                currentUser: referenceUser,
                                nivel: nivel - 1
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Network3x3.prototype.getReferenceDown = function (referenceUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                            where: {
                                referenceUser: referenceUser,
                                status: typeorm_1.Not(typeorm_1.Equal(NetworkUser_1.NetworkUserStatus.completed))
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Network3x3.prototype.createUp = function (nivel, nivel_global, currentUser, referenceUser, network) {
        return __awaiter(this, void 0, void 0, function () {
            var findNivelGlonal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                            where: {
                                currentUser: referenceUser,
                                nivel: 1
                            }
                        })];
                    case 1:
                        findNivelGlonal = _a.sent();
                        if (!findNivelGlonal) {
                            nivel_global = -1;
                        }
                        else {
                            nivel_global = findNivelGlonal.nivel_global + 1;
                        }
                        return [4 /*yield*/, NetworkUser_1.NetworkUser.create({
                                nivel: nivel,
                                nivel_global: nivel_global,
                                currentUser: currentUser,
                                referenceUser: referenceUser,
                                network: network
                            }).save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Network3x3.prototype.createDown = function (nivel, nivel_global, currentUser, referenceUser, network) {
        return __awaiter(this, void 0, void 0, function () {
            var findNivelGlonal, checkNivel, count, save, findNetworkId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                            where: {
                                currentUser: referenceUser,
                                nivel: 1
                            }
                        })];
                    case 1:
                        findNivelGlonal = _a.sent();
                        if (!findNivelGlonal) {
                            nivel_global = -1;
                        }
                        else {
                            nivel_global = findNivelGlonal.nivel_global + 1;
                        }
                        return [4 /*yield*/, NetworkUser_1.NetworkUser
                                .find({
                                where: {
                                    status: typeorm_1.Not(typeorm_1.Equal(NetworkUser_1.NetworkUserStatus.completed)),
                                    referenceUser: referenceUser.id,
                                    nivel: nivel
                                }
                            })];
                    case 2:
                        checkNivel = _a.sent();
                        count = 0;
                        checkNivel.forEach(function () {
                            count++;
                        });
                        return [4 /*yield*/, NetworkUser_1.NetworkUser.create({
                                nivel: nivel,
                                nivel_global: count + 1000,
                                currentUser: currentUser,
                                referenceUser: referenceUser,
                                network: network
                            }).save()];
                    case 3:
                        save = _a.sent();
                        process.exit();
                        if (!(count >= this.amountByNivel)) return [3 /*break*/, 6];
                        return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                                where: {
                                    currentUser: referenceUser
                                }
                            })];
                    case 4:
                        findNetworkId = _a.sent();
                        return [4 /*yield*/, NetworkUser_1.NetworkUser.update(findNetworkId.id, {
                                status: NetworkUser_1.NetworkUserStatus.completed
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        console.log("======================================C", count);
                        console.log("======================================C", count);
                        console.log("======================================C", count, referenceUser, save);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Network3x3;
}());
exports.default = new Network3x3();
