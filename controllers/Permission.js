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
var PermissionController = /** @class */ (function () {
    function PermissionController() {
    }
    PermissionController.prototype.instance = function (instance_id, just_enable) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = [];
                console.log(instance_id);
                try {
                    data = require("./../../data/permission/" + instance_id + ".ts")['default'];
                    if (just_enable) {
                        data = data.filter(function (item) {
                            return item.enable;
                        });
                    }
                }
                catch (e) {
                    data = [];
                }
                return [2 /*return*/, data];
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
    PermissionController.prototype.permission_instance_user = function (instance_id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var instanceRepository, instanceRelationalRepository, instance, instance_relational, InstanceRelationGroup, groups_relations, groups_relations, groupsRepository, groups, permissions, modules, _a, _b, _i, g, group, groupPermissionItemsRepository, group_items, _c, _d, _e, i, item, moduleRepository, module;
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
                        console.log("instance:::", instance_relational);
                        InstanceRelationGroup = typeorm_1.getRepository(InstanceRelationGroupEntity);
                        return [4 /*yield*/, InstanceRelationGroup.find({
                                where: {
                                    instanceRelation: instance
                                },
                                relations: ["instanceRelation"]
                            })];
                    case 3:
                        groups_relations = _f.sent();
                        groups_relations = groups_relations.filter(function (group) {
                            console.log("check:::", group.instanceRelation, instance_relational, group.instanceRelation.user_id_instance == instance_relational.user_id_instance);
                            if (group.instanceRelation.user_id_instance == instance_relational.user_id_instance) {
                                return true;
                            }
                        });
                        console.log("grops_relations:::", groups_relations);
                        groupsRepository = typeorm_1.getRepository(GroupEntity);
                        return [4 /*yield*/, groupsRepository.findByIds(groups_relations)];
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
                    case 12:
                        console.log('global:::', modules);
                        return [2 /*return*/, {
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