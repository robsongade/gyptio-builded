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
var User_1 = require("../entity/User");
var UserEntity = User_1.User;
var Instance_1 = require("../entity/Instance");
var InstanceRelation_1 = require("../entity/InstanceRelation");
var InstanceRelational_1 = __importDefault(require("./InstanceRelational"));
var InstanceEntity = Instance_1.Instance;
//const UserRoles = User.Enum.UserRoles
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.create = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, _a, username, password, email, origin_instance, role, data, new_user, save, instance, _instanceRelation;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userRepository = typeorm_1.getRepository(UserEntity);
                        _a = request.body, username = _a.username, password = _a.password, email = _a.email;
                        origin_instance = request.headers.origin_instance;
                        role = User_1.UserRoles.STAFF;
                        data = {
                            username: username,
                            password: password,
                            email: email,
                            role: role
                        };
                        new_user = userRepository.create(data);
                        return [4 /*yield*/, userRepository.save(new_user)];
                    case 1:
                        save = _b.sent();
                        if (!origin_instance) return [3 /*break*/, 4];
                        return [4 /*yield*/, Instance_1.Instance.findOne(origin_instance.id)];
                    case 2:
                        instance = _b.sent();
                        _instanceRelation = {
                            instance: instance,
                            user: save,
                            status: 10
                        };
                        return [4 /*yield*/, InstanceRelational_1.default.pin(_instanceRelation)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        response.status(200).json(save);
                        return [2 /*return*/];
                }
            });
        }); };
        this.validate = function (request) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, _a, password, email, data, user, check_password;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userRepository = typeorm_1.getRepository(UserEntity);
                        _a = request.body, password = _a.password, email = _a.email;
                        data = {
                            password: password,
                            email: email
                        };
                        if (!password) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, userRepository.findOne({
                                where: [
                                    {
                                        email: email
                                    }, {
                                        username: email
                                    }
                                ]
                            })];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                    case 2:
                        check_password = _b.sent();
                        if (!user || !check_password) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, user];
                }
            });
        }); };
        this.user = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var user, _user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = request.params.storage.user;
                        return [4 /*yield*/, typeorm_1.getRepository(UserEntity).findOne(user.id)];
                    case 1:
                        _user = _a.sent();
                        _user.password = "";
                        response.send({ user: _user });
                        return [2 /*return*/];
                }
            });
        }); };
        this.edit = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var user, _a, fullName, username, email, url_image, password, new_password, newData, salt, editUser, edit, newUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = request.params.storage.user;
                        _a = request.body.userDataEdit, fullName = _a.fullName, username = _a.username, email = _a.email, url_image = _a.url_image, password = _a.password, new_password = _a.new_password;
                        newData = {
                            fullName: fullName,
                            username: username,
                            url_image: url_image,
                            email: email
                        };
                        if (password && new_password) {
                            if (password != new_password) {
                                response.status(201).json({ error: true, message: 'password' });
                            }
                            salt = bcryptjs_1.default.genSaltSync(10);
                            newData.password = bcryptjs_1.default.hashSync(password, salt);
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(UserEntity).findOne(user.id)];
                    case 1:
                        editUser = _b.sent();
                        console.log("editUser:::", editUser, newData);
                        return [4 /*yield*/, typeorm_1.getRepository(UserEntity).update(user.id, newData)];
                    case 2:
                        edit = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(UserEntity).findOne(user.id)];
                    case 3:
                        newUser = _b.sent();
                        response.send({ user: newUser });
                        return [2 /*return*/];
                }
            });
        }); };
        this.users = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var instance, user, user_id, UserRepository, InstanceUserRepository, InstanceRepository, permission, Instance, _a, _b, _c, instance_user, instance_user_aproves, instance_user_to_accept, users;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        instance = request.params.storage.instance;
                        user = request.params.storage.user;
                        user_id = user.id;
                        UserRepository = typeorm_1.getRepository(UserEntity);
                        InstanceUserRepository = typeorm_1.getRepository(InstanceRelation_1.InstanceRelation);
                        InstanceRepository = typeorm_1.getRepository(InstanceEntity);
                        permission = global._permissions.check("user", "list");
                        return [4 /*yield*/, InstanceRepository.findOne({
                                where: {
                                    instance_id: instance
                                }
                            })];
                    case 1:
                        Instance = _d.sent();
                        if (!!permission) return [3 /*break*/, 3];
                        _b = (_a = response.status(200)).json;
                        _c = {};
                        return [4 /*yield*/, InstanceUserRepository.find({
                                where: {
                                    user: user_id,
                                    instance: Instance
                                },
                                relations: ["user"]
                            })];
                    case 2:
                        _b.apply(_a, [(_c.instance_user = _d.sent(),
                                _c)]);
                        return [2 /*return*/];
                    case 3: return [4 /*yield*/, InstanceUserRepository.find({
                            where: {
                                instance: Instance,
                                status: 10
                            },
                            relations: ["user"]
                        })];
                    case 4:
                        instance_user = _d.sent();
                        return [4 /*yield*/, InstanceUserRepository.find({
                                where: {
                                    instance: Instance,
                                    status: 1
                                },
                                relations: ["user"]
                            })];
                    case 5:
                        instance_user_aproves = _d.sent();
                        return [4 /*yield*/, InstanceUserRepository.find({
                                where: {
                                    instance: Instance,
                                    status: 2
                                },
                                relations: ["user"]
                            })];
                    case 6:
                        instance_user_to_accept = _d.sent();
                        return [4 /*yield*/, InstanceUserRepository.find({
                                where: {
                                    instance: Instance,
                                }
                            })
                            // const users_aproves = await UserRepository.findByIds(instance_user_aproves)
                            //  const users_to_accept = await UserRepository.findByIds(instance_user_to_accept)
                        ];
                    case 7:
                        users = _d.sent();
                        // const users_aproves = await UserRepository.findByIds(instance_user_aproves)
                        //  const users_to_accept = await UserRepository.findByIds(instance_user_to_accept)
                        response.status(200).json({
                            users: users, instance_user_aproves: instance_user_aproves, instance_user_to_accept: instance_user_to_accept, instance_user: instance_user, instance: instance, instance_id: request.params.storage, Instance: Instance,
                            permission: global._permissions,
                        });
                        return [2 /*return*/];
                }
            });
        }); };
    }
    UserController.prototype.auth_origin_instance = function (user, origin_instance) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, find, x, relation, instance, _instanceRelation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(UserEntity).findOne({
                            where: {
                                id: user.id,
                            },
                            relations: ["instances_relation"]
                        })];
                    case 1:
                        userRepository = _a.sent();
                        find = false;
                        if (!userRepository) return [3 /*break*/, 4];
                        for (x in userRepository.instances_relation) {
                            relation = userRepository.instances_relation[x];
                            if (relation.instanceId == origin_instance.id && relation.status == 10) {
                                find = {
                                    user_id_instance: relation.user_id_instance
                                };
                            }
                        }
                        if (!!find) return [3 /*break*/, 4];
                        return [4 /*yield*/, Instance_1.Instance.findOne(origin_instance.id)];
                    case 2:
                        instance = _a.sent();
                        _instanceRelation = {
                            instance: instance,
                            user: user,
                            status: 1
                        };
                        return [4 /*yield*/, InstanceRelational_1.default.pin(_instanceRelation)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, find ? find : false];
                }
            });
        });
    };
    UserController.prototype.instances = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var instanceRepository, instances;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instanceRepository = typeorm_1.getRepository(InstanceEntity);
                        return [4 /*yield*/, instanceRepository.find({
                                select: ["id", "name"],
                                where: {
                                    user: userId
                                },
                                relations: ["user"]
                            })];
                    case 1:
                        instances = _a.sent();
                        return [2 /*return*/, {
                                instances: instances
                            }];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=User.js.map