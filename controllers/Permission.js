"use strict";
/*
    TODO: instance not found if not have permission
*/
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Instance_1 = require("../entity/Instance");
var InstanceRelationGroup_1 = require("../entity/InstanceRelationGroup");
var InstanceRelation_1 = require("../entity/InstanceRelation");
var Group_1 = require("../entity/Group");
var GroupPermissionItem_1 = require("../entity/GroupPermissionItem");
var Module_1 = require("../entity/Module");
var InstanceEntity = Instance_1.Instance;
var InstanceRelationEntity = InstanceRelation_1.InstanceRelation;
var InstanceRelationGroupEntity = InstanceRelationGroup_1.InstanceRelationGroup;
var GroupEntity = Group_1.Group;
var GroupPermissionItemEntity = GroupPermissionItem_1.GroupPermissionItem;
var ModuleEntity = Module_1.Module;
var Permissions = [
    {
        module: 'product',
        permissions: ['create', 'view', 'edit']
    }, {
        module: 'grade',
        permissions: ['create', 'view', 'edit']
    }, {
        module: 'grade_item',
        permissions: ['create', 'view', 'edit']
    }, , {
        module: 'user',
        permissions: ['create', 'view', 'edit']
    },
];
var permission_request;
var set_request = function (request) {
    permission_request = request;
    return {
        check_permission: check_permission
    };
};
var check_permission = function (module, type_permission, action, OrOwner) {
    if (action === void 0) { action = false; }
    if (OrOwner === void 0) { OrOwner = false; }
    return __awaiter(_this, void 0, void 0, function () {
        var check, _a, instance, user, findInstance;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    check = global._permissions.check(module, type_permission);
                    if (!(!check && OrOwner)) return [3 /*break*/, 2];
                    _a = permission_request.params.storage, instance = _a.instance, user = _a.user;
                    if (!(instance && user)) return [3 /*break*/, 2];
                    return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne({
                            where: {
                                instance_id: instance
                            }
                        })];
                case 1:
                    findInstance = _b.sent();
                    if (findInstance.userId == user.id) {
                        check = true;
                    }
                    _b.label = 2;
                case 2:
                    if (action) {
                        if (typeof action == "function") {
                            return [2 /*return*/, action(check)];
                        }
                    }
                    console.log("asdasdasd", check);
                    return [2 /*return*/, check];
            }
        });
    });
};
var PermissionController = /** @class */ (function () {
    function PermissionController() {
    }
    PermissionController.prototype.set_request = function (request) {
        return set_request(request);
    };
    PermissionController.prototype.group = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, storage, group_id, check, instance, instanceRepository, modules, m, mi, instance_id, id, where_group, find, group, group_item_1, find_modules, _b, _c, _i, g, _d, _e, _f, m, group_item, i, search, data_response_group;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = request.params, storage = _a.storage, group_id = _a.group_id;
                        console.log("global._permissions:::", global._permissions);
                        check = set_request(request).check_permission("permission", "list", function (result) {
                            if (!result)
                                response.status(200).json({
                                    error: "Sem permissão"
                                });
                            return result;
                        }, true);
                        if (!check) {
                            console.log("Passwor aqui");
                            return [2 /*return*/];
                        }
                        instance = storage.instance;
                        return [4 /*yield*/, typeorm_1.getRepository(InstanceEntity).findOne({
                                where: {
                                    instance_id: instance
                                },
                            })];
                    case 1:
                        instanceRepository = _g.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(ModuleEntity).find()];
                    case 2:
                        modules = _g.sent();
                        for (m in modules) {
                            modules[m].permissions = [];
                            for (mi in GroupPermissionItem_1.ModuleItem) {
                                modules[m].permissions.push({
                                    item: GroupPermissionItem_1.ModuleItem[mi]
                                });
                            }
                        }
                        instance_id = instanceRepository.id;
                        id = group_id;
                        where_group = id ? {
                            instance: instance_id,
                            id: id
                        } : {
                            instance: instance_id,
                        };
                        find = !id ? 'find' : 'findOne';
                        return [4 /*yield*/, typeorm_1.getRepository(Group_1.Group)[find]({
                                where: where_group,
                                relations: ["groups_permission_item"]
                            })];
                    case 3:
                        group = _g.sent();
                        if (!id) return [3 /*break*/, 5];
                        return [4 /*yield*/, typeorm_1.getRepository(GroupPermissionItem_1.GroupPermissionItem)['find']({
                                where: {
                                    group: group_id
                                }
                            })];
                    case 4:
                        group_item_1 = _g.sent();
                        group.groups_permission_item = group_item_1;
                        return [3 /*break*/, 12];
                    case 5:
                        _b = [];
                        for (_c in group)
                            _b.push(_c);
                        _i = 0;
                        _g.label = 6;
                    case 6:
                        if (!(_i < _b.length)) return [3 /*break*/, 12];
                        g = _b[_i];
                        group[g].groups_permission_item = [];
                        return [4 /*yield*/, typeorm_1.getRepository(Module_1.Module).find()];
                    case 7:
                        find_modules = _g.sent();
                        _d = [];
                        for (_e in find_modules)
                            _d.push(_e);
                        _f = 0;
                        _g.label = 8;
                    case 8:
                        if (!(_f < _d.length)) return [3 /*break*/, 11];
                        m = _d[_f];
                        module = find_modules[m];
                        return [4 /*yield*/, typeorm_1.getRepository(GroupPermissionItem_1.GroupPermissionItem)['find']({
                                where: {
                                    group: group[g].id,
                                    module: module
                                }
                            })];
                    case 9:
                        group_item = _g.sent();
                        for (i in group_item) {
                            search = group[g].groups_permission_item.find(function (check) { return check.id == group_item[i].id; });
                            if (!search)
                                group[g].groups_permission_item.push(group_item[i]);
                        }
                        console.log("group:::", group[g]);
                        _g.label = 10;
                    case 10:
                        _f++;
                        return [3 /*break*/, 8];
                    case 11:
                        _i++;
                        return [3 /*break*/, 6];
                    case 12:
                        data_response_group = !id ? {
                            groups: group
                        } : { group: group };
                        response.status(200).json(__assign({}, data_response_group, { modules: modules }));
                        return [2 /*return*/];
                }
            });
        });
    };
    PermissionController.prototype.just_pass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.json({
                    blah: 'blah'
                });
                return [2 /*return*/];
            });
        });
    };
    PermissionController.prototype.group_edit = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var permission;
            var _this = this;
            return __generator(this, function (_a) {
                permission = set_request(request).check_permission("permission", "edit", function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, storage, group_id, modules, group, name, description, instance, findInstance, groupRepository, findGroup, groupItemRepository, _b, _c, _i, m, module, _d, _e, _f, i, item, newItem, grupo_item, create;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                if (!result) {
                                    response.json({
                                        error: "Sem permissão"
                                    });
                                    return [2 /*return*/, result];
                                }
                                _a = request.params, storage = _a.storage, group_id = _a.group_id;
                                modules = request.body.modules;
                                group = request.body.group;
                                name = group.name, description = group.description;
                                instance = storage.instance;
                                if (!name) {
                                    response.json({
                                        error: "Insira um nome para o grupo"
                                    });
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, typeorm_1.getRepository(InstanceEntity).findOne({
                                        where: {
                                            instance_id: instance
                                        }
                                    })];
                            case 1:
                                findInstance = _g.sent();
                                groupRepository = typeorm_1.getRepository(Group_1.Group);
                                return [4 /*yield*/, groupRepository.findOne({
                                        instance: findInstance,
                                        id: group_id
                                    })];
                            case 2:
                                findGroup = _g.sent();
                                if (!findGroup) {
                                    response.json({
                                        error: "Sem permissão"
                                    });
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, groupRepository.update(findGroup.id, {
                                        name: name, description: description
                                    })];
                            case 3:
                                _g.sent();
                                groupItemRepository = typeorm_1.getRepository(GroupPermissionItem_1.GroupPermissionItem);
                                _b = [];
                                for (_c in modules)
                                    _b.push(_c);
                                _i = 0;
                                _g.label = 4;
                            case 4:
                                if (!(_i < _b.length)) return [3 /*break*/, 15];
                                m = _b[_i];
                                module = modules[m];
                                _d = [];
                                for (_e in module.items)
                                    _d.push(_e);
                                _f = 0;
                                _g.label = 5;
                            case 5:
                                if (!(_f < _d.length)) return [3 /*break*/, 14];
                                i = _d[_f];
                                item = module.items[i];
                                console.log(item);
                                if (!item.checked) return [3 /*break*/, 11];
                                newItem = {
                                    name: module.name + ":" + item.role,
                                    description: "",
                                    roles: item.role,
                                    group: group_id,
                                    module: module.id
                                };
                                return [4 /*yield*/, groupItemRepository.findOne({
                                        where: {
                                            group: group_id,
                                            module: module.id,
                                            roles: item.role
                                        }
                                    })];
                            case 6:
                                grupo_item = _g.sent();
                                if (!!grupo_item) return [3 /*break*/, 8];
                                console.log("Cirar:::", grupo_item);
                                return [4 /*yield*/, groupItemRepository.create(newItem)];
                            case 7:
                                create = _g.sent();
                                create.save();
                                return [3 /*break*/, 10];
                            case 8:
                                console.log("Update:::", grupo_item);
                                return [4 /*yield*/, groupItemRepository.update(grupo_item.id, newItem)];
                            case 9:
                                _g.sent();
                                _g.label = 10;
                            case 10: return [3 /*break*/, 13];
                            case 11: return [4 /*yield*/, groupItemRepository.delete({
                                    group: group_id,
                                    module: module.id,
                                    roles: item.role
                                })];
                            case 12:
                                _g.sent();
                                _g.label = 13;
                            case 13:
                                _f++;
                                return [3 /*break*/, 5];
                            case 14:
                                _i++;
                                return [3 /*break*/, 4];
                            case 15:
                                response.status(200).json({
                                    success: true
                                });
                                return [2 /*return*/];
                        }
                    });
                }); }, true);
                return [2 /*return*/];
            });
        });
    };
    PermissionController.prototype.delete_group = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                set_request(request).check_permission("permission", "delete", function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var storage, group, instance, findInstance, groupRepository, findGroup, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!result) {
                                    response.json({
                                        error: "Sem permissão"
                                    });
                                    return [2 /*return*/, result];
                                }
                                storage = request.params.storage;
                                group = request.body.group;
                                instance = storage.instance;
                                return [4 /*yield*/, typeorm_1.getRepository(InstanceEntity).findOne({
                                        where: {
                                            instance_id: instance
                                        }
                                    })];
                            case 1:
                                findInstance = _a.sent();
                                groupRepository = typeorm_1.getRepository(Group_1.Group);
                                return [4 /*yield*/, groupRepository.findOne({
                                        instance: findInstance,
                                        id: group.id
                                    })];
                            case 2:
                                findGroup = _a.sent();
                                if (!findGroup) {
                                    response.json({
                                        error: "Sem permissão"
                                    });
                                    return [2 /*return*/];
                                }
                                _a.label = 3;
                            case 3:
                                _a.trys.push([3, 5, , 6]);
                                return [4 /*yield*/, groupRepository.delete(findGroup.id)];
                            case 4:
                                _a.sent();
                                response.json({
                                    success: true
                                });
                                return [3 /*break*/, 6];
                            case 5:
                                e_1 = _a.sent();
                                response.json({
                                    error: {
                                        message: e_1.detail
                                    }
                                });
                                return [3 /*break*/, 6];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); }, true);
                return [2 /*return*/];
            });
        });
    };
    PermissionController.prototype.group_add = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                set_request(request).check_permission('permission', 'create', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var storage, group, name, description, instance, findInstance, groupRepository, create, new_group;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!result) {
                                    response.json({
                                        error: "Sem permissão"
                                    });
                                    return [2 /*return*/, result];
                                }
                                storage = request.params.storage;
                                group = request.body.group;
                                name = group.name, description = group.description;
                                instance = storage.instance;
                                if (!name) {
                                    response.json({
                                        error: "Insira um nome para o grupo"
                                    });
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, typeorm_1.getRepository(InstanceEntity).findOne({
                                        where: {
                                            instance_id: instance
                                        }
                                    })];
                            case 1:
                                findInstance = _a.sent();
                                groupRepository = typeorm_1.getRepository(Group_1.Group);
                                return [4 /*yield*/, groupRepository.create({
                                        instance: findInstance,
                                        name: name, description: description
                                    })];
                            case 2:
                                create = _a.sent();
                                return [4 /*yield*/, create.save()];
                            case 3:
                                new_group = _a.sent();
                                response.status(200).json({
                                    success: true,
                                    group: new_group
                                });
                                return [2 /*return*/];
                        }
                    });
                }); }, 'or_owner');
                return [2 /*return*/];
            });
        });
    };
    PermissionController.prototype.permission_instance_user = function (instance_id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var instanceRepository, instanceRelationalRepository, instance, instance_relational, InstanceRelationGroup, groups_relations, groups_relations, ids, x, groupsRepository, groups, permissions, modules, _a, _b, _i, g, group, groupPermissionItemsRepository, group_items, _c, _d, _e, i, item, moduleRepository, module;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        instanceRepository = typeorm_1.getRepository(InstanceEntity);
                        instanceRelationalRepository = typeorm_1.getRepository(InstanceRelationEntity);
                        return [4 /*yield*/, instanceRepository.findOne({
                                where: {
                                    instance_id: instance_id
                                }
                            })];
                    case 1:
                        instance = _f.sent();
                        if (!instance)
                            return [2 /*return*/];
                        console.log("instance:::", instance);
                        return [4 /*yield*/, instanceRelationalRepository.findOne({
                                where: {
                                    instance: instance,
                                    user: user
                                }
                            })];
                    case 2:
                        instance_relational = _f.sent();
                        if (instance.userId == user.id && instance.type == 'master') {
                            return [2 /*return*/, {
                                    instance: instance,
                                    permissions: {
                                        master: 'master'
                                    }
                                }];
                        }
                        console.log("instance:::", instance, user, instance_relational);
                        InstanceRelationGroup = typeorm_1.getRepository(InstanceRelationGroupEntity);
                        return [4 /*yield*/, InstanceRelationGroup.find({
                                where: {
                                    instanceRelation: instance_relational
                                },
                                relations: ["instanceRelation"]
                            })];
                    case 3:
                        groups_relations = _f.sent();
                        console.log("groups_relations:::", groups_relations);
                        groups_relations = groups_relations.filter(function (group) {
                            console.log("check:::", group.instanceRelation, instance_relational, group.instanceRelation.user_id_instance == instance_relational.user_id_instance);
                            if (group.instanceRelation.user_id_instance == instance_relational.user_id_instance) {
                                return true;
                            }
                        });
                        console.log("grops_relations2:::", groups_relations);
                        ids = [];
                        for (x in groups_relations) {
                            ids.push({
                                id: groups_relations[x].groupId
                            });
                        }
                        groupsRepository = typeorm_1.getRepository(GroupEntity);
                        return [4 /*yield*/, groupsRepository.findByIds(ids)];
                    case 4:
                        groups = _f.sent();
                        console.log("groups:::", groups);
                        permissions = {};
                        modules = {};
                        _a = [];
                        for (_b in groups)
                            _a.push(_b);
                        _i = 0;
                        _f.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3 /*break*/, 12];
                        g = _a[_i];
                        group = groups[g];
                        groupPermissionItemsRepository = typeorm_1.getRepository(GroupPermissionItemEntity);
                        return [4 /*yield*/, groupPermissionItemsRepository.find({
                                where: {
                                    group: group.id
                                }
                            })];
                    case 6:
                        group_items = _f.sent();
                        console.log("group_items:::", group_items);
                        _c = [];
                        for (_d in group_items)
                            _c.push(_d);
                        _e = 0;
                        _f.label = 7;
                    case 7:
                        if (!(_e < _c.length)) return [3 /*break*/, 11];
                        i = _c[_e];
                        item = group_items[i];
                        if (!!modules[item.moduleId]) return [3 /*break*/, 9];
                        moduleRepository = typeorm_1.getRepository(ModuleEntity);
                        return [4 /*yield*/, moduleRepository.findOne(item.moduleId)];
                    case 8:
                        module = _f.sent();
                        modules[item.moduleId] = module.code;
                        modules[module.code] = {};
                        _f.label = 9;
                    case 9:
                        modules[modules[item.moduleId]][item.roles] = true;
                        _f.label = 10;
                    case 10:
                        _e++;
                        return [3 /*break*/, 7];
                    case 11:
                        _i++;
                        return [3 /*break*/, 5];
                    case 12: return [2 /*return*/, {
                            instance: instance,
                            permissions: modules
                        }];
                }
            });
        });
    };
    return PermissionController;
}());
var Permission = new PermissionController();
exports.default = Permission;
//# sourceMappingURL=Permission.js.map