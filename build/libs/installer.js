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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Installer = exports.InstallerGenerator = void 0;
var typeorm_1 = require("typeorm");
var InstanceRelation_1 = require("../entity/InstanceRelation");
var Instance_1 = require("../entity/Instance");
var User_1 = require("../entity/User");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var Module_1 = require("../entity/Module");
var Group_1 = require("../entity/Group");
var InstallerGenerator = /** @class */ (function () {
    function InstallerGenerator() {
        var _this = this;
        this.CreateUserMaster = function () { return __awaiter(_this, void 0, void 0, function () {
            var username, email, password, role, salt, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = process.env.GYPTIO_USERNAME_MASTER || 'admin';
                        email = process.env.GYPTIO_EMAIL_MASTER || 'admin@example.com';
                        password = process.env.GYPTIO_PASSWORD_MASTER || 'root';
                        role = User_1.UserRoles.STAFF;
                        salt = bcryptjs_1.default.genSaltSync(10);
                        password = bcryptjs_1.default.hashSync(password, salt);
                        data = {
                            username: username,
                            email: email,
                            password: password,
                            role: role
                        };
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.CreateInstanceMaster = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            name: "Installer",
                            description: "This is an instance of total control for general management",
                            user: user,
                            status: Instance_1.InstanceStatus.ACTIVED,
                            type: Instance_1.TypeInstance.MASTER
                        };
                        return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).save(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.CreateInstanceRelation = function (user, instance) { return __awaiter(_this, void 0, void 0, function () {
            var relation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(InstanceRelation_1.InstanceRelation).save({
                            status: InstanceRelation_1.InstanceRelationalStatus.ACTIVED,
                            user: user,
                            instance: instance
                        })];
                    case 1:
                        relation = _a.sent();
                        return [2 /*return*/, relation];
                }
            });
        }); };
        this.CreateModules = function () { return __awaiter(_this, void 0, void 0, function () {
            var create_modules, _a, _b, _i, m, modulos;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        create_modules = [{
                                name: "Permission",
                                code: "permission"
                            }, {
                                name: "Module",
                                code: "module"
                            }, {
                                name: "User",
                                code: "user"
                            }];
                        _a = [];
                        for (_b in create_modules)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        m = _a[_i];
                        return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).save(create_modules[m])];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).find()];
                    case 5:
                        modulos = _c.sent();
                        return [2 /*return*/, modulos];
                }
            });
        }); };
        this.CreateGroup = function (instance) { return __awaiter(_this, void 0, void 0, function () {
            var data, modulos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            name: "Administrator",
                            instance: instance
                        };
                        return [4 /*yield*/, typeorm_1.getRepository(Group_1.Group).save(data)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Group_1.Group).findOne()];
                    case 2:
                        modulos = _a.sent();
                        return [2 /*return*/, modulos];
                }
            });
        }); };
    }
    InstallerGenerator.prototype.__construct = function () {
        console.log("Installer");
    };
    return InstallerGenerator;
}());
exports.InstallerGenerator = InstallerGenerator;
var Installer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var installerGenerator, user, new_user, instance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                installerGenerator = new InstallerGenerator();
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne()];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 8];
                return [4 /*yield*/, installerGenerator.CreateUserMaster()];
            case 2:
                new_user = _a.sent();
                console.log("User created ", new_user.id);
                return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne()];
            case 3:
                instance = _a.sent();
                if (!!instance) return [3 /*break*/, 8];
                console.log("Creating instance...");
                return [4 /*yield*/, installerGenerator.CreateInstanceMaster(new_user)];
            case 4:
                instance = _a.sent();
                return [4 /*yield*/, installerGenerator.CreateInstanceRelation(new_user, instance)];
            case 5:
                _a.sent();
                return [4 /*yield*/, installerGenerator.CreateModules()];
            case 6:
                _a.sent();
                return [4 /*yield*/, installerGenerator.CreateGroup(instance)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.Installer = Installer;
