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
var NetworkToDonation_1 = require("../../../entity/modules/NetworkToDonation/NetworkToDonation");
var NetworkUser_1 = require("../../../entity/modules/NetworkUser/NetworkUser");
var NetworkRepasse_1 = require("../../../entity/modules/NetworkRepasse/NetworkRepasse");
var NetworkToDonationController = /** @class */ (function () {
    function NetworkToDonationController() {
    }
    NetworkToDonationController.prototype.process = function (user, nullReference) {
        if (nullReference === void 0) { nullReference = false; }
        return __awaiter(this, void 0, void 0, function () {
            var UserReference, userActive;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("=====processToDonation=====", user);
                        if (!nullReference) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.register(user.currentUserId, null, user.networkId, user.nivel)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        UserReference = null;
                        return [4 /*yield*/, this.check_user_active(user)];
                    case 3:
                        userActive = _a.sent();
                        if (!userActive) return [3 /*break*/, 4];
                        UserReference = userActive.referenceUserId;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.getUserUplineActive(null)];
                    case 5:
                        UserReference = _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.register(user.currentUserId, UserReference, user.networkId, user.nivel)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NetworkToDonationController.prototype.check_user_active = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var findReferenceUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkUser_1.NetworkUser.findOne({
                            nivel: user.nivel,
                            currentUser: user.currentUserId
                        })];
                    case 1:
                        findReferenceUser = _a.sent();
                        if (findReferenceUser) {
                            //Verificar se o usuario esta ativo mas por enquanto retorna o proprio
                            return [2 /*return*/, findReferenceUser];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //se o usuario não estava ativo no ato buscar usuario acima que estiver ativo
    NetworkToDonationController.prototype.getUserUplineActive = function (referenceUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //A logica ainda não esta feita por isso por enquanto estou retornando o mesmo usuario informado
                return [2 /*return*/, referenceUser];
            });
        });
    };
    //Se não ouver um upline ativo buscar usuarios na tabela de usuarios padrão
    NetworkToDonationController.prototype.getUserDefaultOnNotUplineActive = function (referenceUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    NetworkToDonationController.prototype.register = function (currentUser, referenceUser, network, nivel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkToDonation_1.NetworkToDonation.insert({
                            nivel: nivel,
                            currentUser: currentUser,
                            referenceUser: referenceUser,
                            network: network
                        })
                        // await save.save();
                    ];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NetworkToDonationController.prototype.register_repasse = function (networkUser, network_to_donation, motivo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkRepasse_1.NetworkRepasse.insert({
                            networkUser: networkUser,
                            networkToDonation: network_to_donation,
                            motivo: motivo
                        })
                        // await save.save();
                    ];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return NetworkToDonationController;
}());
exports.NetworkToDonationController = NetworkToDonationController;
