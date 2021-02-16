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
var typeorm_1 = require("typeorm");
var Instance_1 = require("../entity/Instance");
var InstanceRelation_1 = require("../entity/InstanceRelation");
var Auth_1 = __importDefault(require("./Auth"));
var InstanceRelational_1 = __importDefault(require("./InstanceRelational"));
var dns = require("dns");
var secret = process.env.SECRET;
exports.default = {
    all_instances: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, findInstanceMaster, instances, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, Auth_1.default.storage()];
                    case 1:
                        instance = (_a.sent()).instance;
                        return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne({
                                where: {
                                    instance_id: instance,
                                    type: 'master'
                                }
                            })];
                    case 2:
                        findInstanceMaster = _a.sent();
                        instances = [];
                        if (!findInstanceMaster) return [3 /*break*/, 4];
                        return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).find()];
                    case 3:
                        instances = _a.sent();
                        _a.label = 4;
                    case 4:
                        res.status(201).json({
                            instances: instances,
                            instance: instance, findInstanceMaster: findInstanceMaster
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        res.status(201).json({ error: true, instances: [] });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    list: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, instances_relational, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = global.storage.user;
                        return [4 /*yield*/, typeorm_1.getRepository(InstanceRelation_1.InstanceRelation).find({
                                join: {
                                    alias: "instances_relational",
                                    leftJoinAndSelect: {
                                        instance: "instances_relational.instance",
                                    }
                                },
                                where: {
                                    user: user
                                }
                            })];
                    case 1:
                        instances_relational = _a.sent();
                        res.status(201).json({
                            instances: instances_relational
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log("e:::", e_2);
                        res.status(201).json({ error: true, instances: [] });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    all: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var instances_relational, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, typeorm_1.getRepository(InstanceRelation_1.InstanceRelation)
                                .find({
                                join: {
                                    alias: "instances_relational",
                                    leftJoinAndSelect: {
                                        instance: "instances_relational.instance",
                                    },
                                }
                            })];
                    case 1:
                        instances_relational = _a.sent();
                        instances_relational = instances_relational.filter(function (instance) { return instance.status == 'user_instance_actived'; });
                        console.log("LISENSE:::", process.env.LICENSE);
                        res.status(201).json({ all_instances: instances_relational });
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.log("e:::", e_3);
                        res.status(201).json({ error: true, all_instances: [] });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    create: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var instanceRepository, _a, name, description, user, data, new_instance, instance, _instanceRelation;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        instanceRepository = typeorm_1.getRepository(Instance_1.Instance);
                        _a = req.body, name = _a.name, description = _a.description;
                        user = global.storage.user;
                        data = {
                            name: name,
                            user: user,
                            status: Instance_1.InstanceStatus.PENDING
                        };
                        new_instance = instanceRepository.create(data);
                        return [4 /*yield*/, instanceRepository.save(new_instance)];
                    case 1:
                        instance = _b.sent();
                        _instanceRelation = {
                            instance: instance,
                            user: user,
                            status: InstanceRelation_1.InstanceRelationalStatus.ACTIVED
                        };
                        return [4 /*yield*/, InstanceRelational_1.default.pin(_instanceRelation)];
                    case 2:
                        _b.sent();
                        res.status(201).json({ instance: instance });
                        return [2 /*return*/];
                }
            });
        });
    },
    instance: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var instance_id, instanceRepository, instance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance_id = req.params.instance_id;
                        instanceRepository = typeorm_1.getRepository(Instance_1.Instance);
                        return [4 /*yield*/, instanceRepository.findOne({
                                where: {
                                    instance_id: instance_id
                                }
                            })];
                    case 1:
                        instance = _a.sent();
                        res.status(201).json({ message: 'Show instance', instance: instance });
                        return [2 /*return*/];
                }
            });
        });
    },
    edit: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var instanceRepository, _a, name, license, description, config, instance_id, data, instance, new_instance, id, instances;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        instanceRepository = typeorm_1.getRepository(Instance_1.Instance);
                        _a = req.body, name = _a.name, license = _a.license, description = _a.description, config = _a.config;
                        instance_id = req.params.instance_id;
                        data = {
                            name: name,
                            license: license,
                            description: description,
                            config: config
                        };
                        return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance).findOne({
                                where: {
                                    instance_id: instance_id
                                }
                            })];
                    case 1:
                        instance = _b.sent();
                        if (instance) {
                            if (license && license != "") {
                                if (instance.type == "master") {
                                    if (license == process.env.LICENSE) {
                                        data.status = Instance_1.InstanceStatus.ACTIVED;
                                    }
                                    else {
                                        data.status = Instance_1.InstanceStatus.PENDING;
                                    }
                                }
                            }
                        }
                        new_instance = instanceRepository.create(data);
                        id = instance.id;
                        return [4 /*yield*/, instanceRepository.update(id, new_instance)];
                    case 2:
                        instances = _b.sent();
                        res.status(201).json({ instances: instances });
                        return [2 /*return*/];
                }
            });
        });
    },
    pin: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, instance_id, instance, _instanceRelation, pin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = global.storage.user;
                        instance_id = req.params.instance_id;
                        return [4 /*yield*/, Instance_1.Instance.findOne({
                                where: {
                                    instance_id: instance_id
                                }
                            })];
                    case 1:
                        instance = _a.sent();
                        _instanceRelation = {
                            instance: instance,
                            user: user,
                            status: InstanceRelation_1.InstanceRelationalStatus.AWAITING_APPROVED
                        };
                        return [4 /*yield*/, InstanceRelational_1.default.pin(_instanceRelation)];
                    case 2:
                        pin = _a.sent();
                        res.status(201).json({ pin: pin });
                        return [2 /*return*/];
                }
            });
        });
    },
    cancel: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, user_id_instance, user_relational, pin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = global.storage.user;
                        user_id_instance = req.params.user_id_instance;
                        console.log("user_relational:::", user_id_instance);
                        return [4 /*yield*/, InstanceRelation_1.InstanceRelation.findOne({
                                where: {
                                    user_id_instance: user_id_instance
                                }
                            })];
                    case 1:
                        user_relational = _a.sent();
                        console.log("user_relational:::", user_relational);
                        pin = {};
                        return [4 /*yield*/, InstanceRelational_1.default.pin_delete_on_have_permission(user_relational)];
                    case 2:
                        pin = _a.sent();
                        res.status(201).json({ pin: pin });
                        return [2 /*return*/];
                }
            });
        });
    },
    pin_delete_on_have_permission: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, _a, instance, user, InstanceRepositiory, currentInstance, InstanceRelationRepositiory, user_instance, aprove;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("user_instance:::", "user_instance");
                        user_id = req.params.user_id;
                        _a = global.storage, instance = _a.instance, user = _a.user;
                        console.log("user_instance:::", instance, req.params);
                        console.log("user:::", user);
                        InstanceRepositiory = typeorm_1.getRepository(Instance_1.Instance);
                        return [4 /*yield*/, InstanceRepositiory.findOne({
                                where: {
                                    instance_id: instance,
                                }
                            })];
                    case 1:
                        currentInstance = _b.sent();
                        InstanceRelationRepositiory = typeorm_1.getRepository(InstanceRelation_1.InstanceRelation);
                        return [4 /*yield*/, InstanceRelationRepositiory.findOne({
                                where: {
                                    user_id_instance: user_id,
                                    instance: currentInstance,
                                    status: InstanceRelation_1.InstanceRelationalStatus.ACTIVED
                                },
                                relations: ["instance"]
                            })];
                    case 2:
                        user_instance = _b.sent();
                        console.log("=================user_instance:::", user_instance);
                        if (user_instance.userId == user.id) {
                            return [2 /*return*/, res.status(201).json({ error: true, message: "Mesmo usuário!", aprove: {} })];
                        }
                        else if (user_instance.instance.userId == user_instance.userId) {
                            return [2 /*return*/, res.status(201).json({ error: true, message: "Dono!", aprove: {} })];
                        }
                        aprove = {};
                        if (user_instance) {
                            aprove = InstanceRelational_1.default.pin_delete_on_have_permission(user_instance);
                        }
                        res.status(201).json({ aprove: aprove, user_instance: user_instance });
                        return [2 /*return*/];
                }
            });
        });
    },
    pin_confirm_on_have_permission: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, instance, InstanceRepositiory, currentInstance, InstanceRelationRepositiory, user_instance, aprove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("user_instance:::", "user_instance");
                        user_id = req.params.user_id;
                        instance = global.storage.instance;
                        console.log("user_instance:::", instance, req.params);
                        InstanceRepositiory = typeorm_1.getRepository(Instance_1.Instance);
                        return [4 /*yield*/, InstanceRepositiory.findOne({
                                where: {
                                    instance_id: instance,
                                }
                            })];
                    case 1:
                        currentInstance = _a.sent();
                        InstanceRelationRepositiory = typeorm_1.getRepository(InstanceRelation_1.InstanceRelation);
                        return [4 /*yield*/, InstanceRelationRepositiory.findOne({
                                where: {
                                    user_id_instance: user_id,
                                    instance: currentInstance,
                                    status: InstanceRelation_1.InstanceRelationalStatus.AWAITING_APPROVED
                                }
                            })];
                    case 2:
                        user_instance = _a.sent();
                        console.log("user_instance:::", user_instance);
                        aprove = {};
                        if (user_instance) {
                            aprove = InstanceRelational_1.default.pin_confirm_on_have_permission(user_instance);
                        }
                        res.status(201).json({ aprove: aprove });
                        return [2 /*return*/];
                }
            });
        });
    },
    instance_origin: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var origin, split1, domain_origin, instanceRepository, new_data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        origin = req.headers.origin || req.headers.referer || req.headers.host || false;
                        if (!origin) {
                            console.log("====================");
                            console.log("====================AFF1");
                            console.log("====================AFF1", req.headers);
                            next();
                            return [2 /*return*/];
                        }
                        split1 = origin.split("//");
                        if (split1.length < 2) {
                            split1 = [null, split1[0] + ":"];
                        }
                        domain_origin = split1[1].split(":")[0];
                        console.log("====================");
                        return [4 /*yield*/, typeorm_1.getRepository(Instance_1.Instance)
                                .createQueryBuilder("instance").
                                where("config @> :config", { config: {
                                    sites: [
                                        {
                                            url: domain_origin,
                                            txt: true
                                        }
                                    ]
                                } }).getOne()];
                    case 1:
                        instanceRepository = _a.sent();
                        console.log("====================1", { sites: [
                                {
                                    url: domain_origin,
                                    txt: true
                                }
                            ] });
                        if (instanceRepository) {
                            new_data = {
                                domain: domain_origin,
                                instance_id: instanceRepository.instance_id,
                                id: instanceRepository.id
                            };
                            global.storage = {
                                instance: instanceRepository.instance_id,
                                user: null,
                                protocol: req.protocol,
                                request: req
                            };
                            req.headers.origin_instance = new_data;
                        }
                        next();
                        return [2 /*return*/];
                }
            });
        });
    },
    check_text: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, domain, instance;
            return __generator(this, function (_b) {
                _a = req.body, domain = _a.domain, instance = _a.instance;
                if (domain && domain.url) {
                    dns.resolveTxt(domain.url, function (error, data) {
                        var is_ok = false;
                        for (var x in data) {
                            var txts = data[x];
                            for (var t in txts) {
                                var txt = txts[t];
                                txt = txt.split("gypt.io-site-verification=")[1];
                                if (instance.instance_id == txt) {
                                    console.log(domain);
                                    is_ok = true;
                                }
                            }
                        }
                        res.send({
                            data: data,
                            checked: is_ok,
                            error: error
                        });
                    });
                }
                else {
                    res.send({
                        error: true
                    });
                }
                return [2 /*return*/];
            });
        });
    }
};
