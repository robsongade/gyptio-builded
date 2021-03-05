"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var Group_1 = require("../entity/Group");
var InstanceRelationGroup_1 = require("../entity/InstanceRelationGroup");
var Permission_1 = __importDefault(require("./Permission"));
var EmailController_1 = __importDefault(require("./modules/Email/EmailController"));
var secret = process.env.SECRET || 'secret';
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Indicator_1 = require("../entity/modules/Indicator/Indicator");
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.create = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, _a, username, password, email, origin_instance, role, data, new_user, save, instance, _instanceRelation, currentUser, indicator, config_email;
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
                        if (!origin_instance) return [3 /*break*/, 10];
                        return [4 /*yield*/, Instance_1.Instance.findOne(origin_instance.id)];
                    case 2:
                        instance = _b.sent();
                        _instanceRelation = {
                            instance: instance,
                            user: save,
                            status: InstanceRelation_1.InstanceRelationalStatus.ACTIVED //TODO : create option to check instance is default ACTIVE or other status
                        };
                        return [4 /*yield*/, InstanceRelational_1.default.pin(_instanceRelation)];
                    case 3:
                        currentUser = _b.sent();
                        indicator = request.body.indicator;
                        if (!indicator) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.createIndicator(indicator, currentUser)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [4 /*yield*/, EmailController_1.default.config()];
                    case 6:
                        config_email = _b.sent();
                        if (!config_email) return [3 /*break*/, 8];
                        return [4 /*yield*/, EmailController_1.default.confirm(email, function (result) {
                                if (result) {
                                    response.status(200).json(__assign({}, save, { success: true, goto: (result.url_dashboard) ? '/email/confirm?email=' + email : false }));
                                }
                                else {
                                    response.status(200).json({
                                        error: true
                                    });
                                }
                            })];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        response.status(200).json(__assign({}, save, { success: true, goto: "/" }));
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        response.status(200).json(save);
                        _b.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        this.permission = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var owner;
            var _this = this;
            return __generator(this, function (_a) {
                owner = Permission_1.default.set_request(request).check_permission('permission', 'list', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        global._permissions['owner'] = result;
                        response.status(200).json({
                            'permissions': global._permissions,
                            'owner': result,
                        });
                        return [2 /*return*/, result];
                    });
                }); }, true);
                return [2 /*return*/];
            });
        }); };
        this.validate = function (request) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, _a, password, email, username, data, user, check_password;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userRepository = typeorm_1.getRepository(UserEntity);
                        _a = request.body, password = _a.password, email = _a.email, username = _a.username;
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
                                        username: username
                                    }
                                ]
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/];
                        }
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
        this.validate_email = function (request) { return __awaiter(_this, void 0, void 0, function () {
            var token, userRepository, _a, password, email, username, response_jwt, user;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        token = request.query.token;
                        userRepository = typeorm_1.getRepository(UserEntity);
                        _a = request.body, password = _a.password, email = _a.email, username = _a.username;
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(token, secret, function (err, decoded) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, decoded];
                                });
                            }); })];
                    case 1:
                        response_jwt = _b.sent();
                        return [4 /*yield*/, userRepository.findOne(response_jwt.user.id)];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, user];
                }
            });
        }); };
        this.user = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var instance, user_id_instance, user, findUserInstance, user, findUser, groups, findInstance, findInstanceRelational, all_groups, items_groups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = global.storage.instance;
                        user_id_instance = request.params.user_id_instance;
                        if (!!user_id_instance) return [3 /*break*/, 1];
                        user = global.storage.user;
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, typeorm_1.getRepository(InstanceRelation_1.InstanceRelation).findOne({
                            where: {
                                user_id_instance: user_id_instance
                            }
                        })];
                    case 2:
                        findUserInstance = _a.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(findUserInstance.userId)];
                    case 3:
                        user = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, typeorm_1.getRepository(UserEntity).findOne(user.id)];
                    case 5:
                        findUser = _a.sent();
                        groups = [];
                        if (!instance) return [3 /*break*/, 10];
                        return [4 /*yield*/, typeorm_1.getRepository(InstanceEntity).findOne({
                                where: {
                                    instance_id: instance
                                },
                            })];
                    case 6:
                        findInstance = _a.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(InstanceRelation_1.InstanceRelation).findOne({
                                where: {
                                    instance: findInstance.id,
                                    user: user
                                },
                            })];
                    case 7:
                        findInstanceRelational = _a.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Group_1.Group).find({
                                where: {
                                    instance: findInstance,
                                }
                            })];
                    case 8:
                        all_groups = _a.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(InstanceRelationGroup_1.InstanceRelationGroup).find({
                                where: {
                                    instanceRelation: findInstanceRelational,
                                },
                            })];
                    case 9:
                        items_groups = _a.sent();
                        groups = all_groups.filter(function (group) {
                            return items_groups.find(function (item) {
                                return item.groupId == group.id;
                            });
                        });
                        _a.label = 10;
                    case 10:
                        findUser.groups = groups;
                        findUser.password = "";
                        response.send({ user: findUser, groups: all_groups });
                        return [2 /*return*/];
                }
            });
        }); };
        this.edit_instance = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var instance, _a, edit_groups, user_id_instance;
            var _this = this;
            return __generator(this, function (_b) {
                instance = global.storage.instance;
                _a = request.body, edit_groups = _a.edit_groups, user_id_instance = _a.user_id_instance;
                Permission_1.default.set_request(request).check_permission('user', 'edit', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var findInstance, findInstanceRelational, _a, _b, _i, g, group, findGroup, action, findItem;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!result) {
                                    response.json({
                                        error: "Sem permissão"
                                    });
                                    return [2 /*return*/, result];
                                }
                                return [4 /*yield*/, typeorm_1.getRepository(InstanceEntity).findOne({
                                        where: {
                                            instance_id: instance
                                        }
                                    })];
                            case 1:
                                findInstance = _c.sent();
                                return [4 /*yield*/, typeorm_1.getRepository(InstanceRelation_1.InstanceRelation).findOne({
                                        where: {
                                            user_id_instance: user_id_instance,
                                            instance: findInstance
                                        }
                                    })];
                            case 2:
                                findInstanceRelational = _c.sent();
                                if (!edit_groups) return [3 /*break*/, 11];
                                _a = [];
                                for (_b in edit_groups)
                                    _a.push(_b);
                                _i = 0;
                                _c.label = 3;
                            case 3:
                                if (!(_i < _a.length)) return [3 /*break*/, 11];
                                g = _a[_i];
                                group = edit_groups[g];
                                return [4 /*yield*/, typeorm_1.getRepository(Group_1.Group).findOne({
                                        where: {
                                            instance: findInstanceRelational.instanceId,
                                            id: group.id
                                        }
                                    })];
                            case 4:
                                findGroup = _c.sent();
                                action = group.delete ? 'delete' : group.checked ? 'add' : false;
                                return [4 /*yield*/, typeorm_1.getRepository(InstanceRelationGroup_1.InstanceRelationGroup).findOne({
                                        where: {
                                            group: findGroup,
                                            instanceRelation: findInstanceRelational
                                        }
                                    })];
                            case 5:
                                findItem = _c.sent();
                                if (!findItem) return [3 /*break*/, 8];
                                if (!action) return [3 /*break*/, 7];
                                if (!(action == 'delete')) return [3 /*break*/, 7];
                                return [4 /*yield*/, typeorm_1.getRepository(InstanceRelationGroup_1.InstanceRelationGroup).delete(findItem.id)];
                            case 6:
                                _c.sent();
                                _c.label = 7;
                            case 7: return [3 /*break*/, 10];
                            case 8:
                                if (!(action && action == "add")) return [3 /*break*/, 10];
                                return [4 /*yield*/, typeorm_1.getRepository(InstanceRelationGroup_1.InstanceRelationGroup).save({
                                        group: findGroup,
                                        instanceRelation: findInstanceRelational
                                    })];
                            case 9:
                                _c.sent();
                                _c.label = 10;
                            case 10:
                                _i++;
                                return [3 /*break*/, 3];
                            case 11:
                                // console.log(editUser);
                                // console.log("editUser:::",editUser,newData)
                                // const edit = await getRepository(UserEntity).update(user.id,newData)
                                // var newUser = await getRepository(UserEntity).findOne(user.id)
                                response.status(200).send({ success: findInstanceRelational });
                                return [2 /*return*/];
                        }
                    });
                }); }, true);
                return [2 /*return*/];
            });
        }); };
        this.edit = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var user, _a, fullName, username, email, url_image, password, new_password, newData, salt, editUser, edit, newUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = global.storage.user;
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
            var _a, instance, user, user_id, UserRepository, InstanceUserRepository, InstanceRepository;
            var _this = this;
            return __generator(this, function (_b) {
                _a = global.storage, instance = _a.instance, user = _a.user;
                user_id = user.id;
                UserRepository = typeorm_1.getRepository(UserEntity);
                InstanceUserRepository = typeorm_1.getRepository(InstanceRelation_1.InstanceRelation);
                InstanceRepository = typeorm_1.getRepository(InstanceEntity);
                Permission_1.default.set_request(request).check_permission("user", "list", function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var Instance, _a, _b, _c, instance_user, instance_user_aproves, instance_user_to_accept, users;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, InstanceRepository.findOne({
                                    where: {
                                        instance_id: instance
                                    }
                                })];
                            case 1:
                                Instance = _d.sent();
                                if (!!result) return [3 /*break*/, 3];
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
                                        status: InstanceRelation_1.InstanceRelationalStatus.ACTIVED
                                    },
                                    relations: ["user"]
                                })];
                            case 4:
                                instance_user = _d.sent();
                                return [4 /*yield*/, InstanceUserRepository.find({
                                        where: {
                                            instance: Instance,
                                            status: InstanceRelation_1.InstanceRelationalStatus.AWAITING_APPROVED
                                        },
                                        relations: ["user"]
                                    })];
                            case 5:
                                instance_user_aproves = _d.sent();
                                return [4 /*yield*/, InstanceUserRepository.find({
                                        where: {
                                            instance: Instance,
                                            status: InstanceRelation_1.InstanceRelationalStatus.AWAITING_ACCEPT
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
                                    users: users, instance_user_aproves: instance_user_aproves, instance_user_to_accept: instance_user_to_accept, instance_user: instance_user, instance: instance, instance_id: global.storage.instance, Instance: Instance
                                });
                                return [2 /*return*/];
                        }
                    });
                }); }, true);
                return [2 /*return*/];
            });
        }); };
    }
    UserController.prototype.createIndicator = function (indicator, currentUser) {
        return __awaiter(this, void 0, void 0, function () {
            var findIndicator, findUserInstance, createIndicator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.findOne({
                            where: {
                                username: indicator
                            }
                        })];
                    case 1:
                        findIndicator = _a.sent();
                        if (!findIndicator) return [3 /*break*/, 4];
                        return [4 /*yield*/, InstanceRelation_1.InstanceRelation.findOne({
                                where: {
                                    user: findIndicator
                                }
                            })];
                    case 2:
                        findUserInstance = _a.sent();
                        if (!findUserInstance) return [3 /*break*/, 4];
                        createIndicator = Indicator_1.Indicator.create({
                            indicatorUser: currentUser,
                            referenceUser: findUserInstance
                        });
                        return [4 /*yield*/, createIndicator.save()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
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
                            if (relation.instanceId == origin_instance.id && relation.status == InstanceRelation_1.InstanceRelationalStatus.ACTIVED) {
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
            var instanceRepository, instances, validated_email, goto, findEmail, config_email, result;
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
                            })
                            //TODO: Fluxo validação email
                        ];
                    case 1:
                        instances = _a.sent();
                        return [4 /*yield*/, InstanceRelation_1.InstanceRelation.findOne({
                                where: {
                                    user: userId,
                                    status_email: 'pending_email'
                                }
                            })];
                    case 2:
                        validated_email = _a.sent();
                        goto = false;
                        if (!validated_email) return [3 /*break*/, 6];
                        return [4 /*yield*/, UserEntity.findOne({
                                where: {
                                    id: validated_email.userId
                                }
                            })];
                    case 3:
                        findEmail = _a.sent();
                        return [4 /*yield*/, EmailController_1.default.config()];
                    case 4:
                        config_email = _a.sent();
                        if (!config_email) return [3 /*break*/, 6];
                        return [4 /*yield*/, EmailController_1.default.confirm(findEmail.email, function (result) {
                                return false;
                            })];
                    case 5:
                        result = _a.sent();
                        goto = "/email/confirm?error=pendent_email&email=" + findEmail.email;
                        _a.label = 6;
                    case 6: return [2 /*return*/, {
                            instances: instances,
                            goto: goto
                        }];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
