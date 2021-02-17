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
var InstanceRelation_1 = require("../entity/InstanceRelation");
var InstanceUserEntity = 1;
exports.default = {
    pin: function (InstanceUser) {
        return __awaiter(this, void 0, void 0, function () {
            var pinRepository, pin, instance_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pinRepository = typeorm_1.getRepository(InstanceRelation_1.InstanceRelation);
                        pin = pinRepository.create({
                            instance: InstanceUser.instance,
                            user: InstanceUser.user,
                            status: InstanceUser.status
                        });
                        return [4 /*yield*/, pinRepository.findOne({
                                where: {
                                    instance: InstanceUser.instance,
                                    user: InstanceUser.user,
                                }
                            })];
                    case 1:
                        instance_user = _a.sent();
                        if (!!instance_user) return [3 /*break*/, 3];
                        return [4 /*yield*/, pinRepository.save(pin)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!instance_user) return [3 /*break*/, 5];
                        return [4 /*yield*/, pinRepository.update(instance_user.id, pin)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/, InstanceUser];
                }
            });
        });
    },
    pin_confirm_on_have_permission: function (InstanceUser) {
        return __awaiter(this, void 0, void 0, function () {
            var pinRepository, instance_user, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pinRepository = typeorm_1.getRepository(InstanceRelation_1.InstanceRelation);
                        return [4 /*yield*/, pinRepository.findOne({
                                where: {
                                    id: InstanceUser.id
                                }
                            })];
                    case 1:
                        instance_user = _a.sent();
                        if (!instance_user)
                            return [2 /*return*/, false];
                        id = instance_user.id;
                        return [4 /*yield*/, pinRepository.update(id, {
                                status: InstanceRelation_1.InstanceRelationalStatus.ACTIVED
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    pin_delete_on_have_permission: function (InstanceUser) {
        return __awaiter(this, void 0, void 0, function () {
            var pinRepository, instance_user, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pinRepository = typeorm_1.getRepository(InstanceRelation_1.InstanceRelation);
                        return [4 /*yield*/, pinRepository.findOne({
                                where: {
                                    id: InstanceUser.id
                                }
                            })];
                    case 1:
                        instance_user = _a.sent();
                        if (!instance_user)
                            return [2 /*return*/, false];
                        id = instance_user.id;
                        return [4 /*yield*/, pinRepository.update(id, {
                                status: InstanceRelation_1.InstanceRelationalStatus.PENDING
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
