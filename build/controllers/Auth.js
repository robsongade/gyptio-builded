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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = require("./User");
var _User = new User_1.UserController();
var Permission_1 = __importDefault(require("./Permission"));
var secret = process.env.SECRET || 'secret';
exports.default = {
    storage: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, global.storage];
            });
        });
    },
    auth: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var validate, instances, id, token, origin_instance, find;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _User.validate(req)];
                    case 1:
                        validate = _a.sent();
                        if (!validate) return [3 /*break*/, 5];
                        console.log("validate:::", validate);
                        return [4 /*yield*/, _User.instances(validate.id)];
                    case 2:
                        instances = _a.sent();
                        console.log("validate:::", validate);
                        id = validate.id;
                        token = jsonwebtoken_1.default.sign({ user: validate }, secret, {
                            expiresIn: (60 * 60 * 24 * 365 * 10) // expires in 10 years
                        });
                        origin_instance = req.headers.origin_instance;
                        if (!origin_instance) return [3 /*break*/, 4];
                        return [4 /*yield*/, _User.auth_origin_instance(validate, origin_instance)];
                    case 3:
                        find = _a.sent();
                        if (!find) {
                            origin_instance = false;
                        }
                        else {
                            origin_instance = {
                                instance_id: origin_instance.instance_id,
                                user_id_instance: find.user_id_instance
                            };
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, res.json({ auth: true, token: token, user: validate, instances: instances, origin_instance: origin_instance })];
                    case 5:
                        res.status(201).json({ error: 'Login inválido!' });
                        return [2 /*return*/];
                }
            });
        });
    },
    token: function (data) {
        var token = jsonwebtoken_1.default.sign({ user_id: data.user_id }, secret, {
            expiresIn: (60 * 60 * 24 * 2) // expires in 2 days
        });
        return { token: token };
    },
    invitation: function (data) {
        var token = jsonwebtoken_1.default.sign({ email: data.email, instance_id: data.instance_id }, secret, {
            expiresIn: (60 * 60 * 24 * 2) // expires in 2 days
        });
        return { token: token };
    },
    verify: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token, instance;
            return __generator(this, function (_b) {
                _a = req.query, token = _a.token, instance = _a.instance;
                token = token || req.headers['authorization'] || '';
                instance = instance || req.headers['instance'] || false;
                console.log('=====token', req.headers);
                if (!token)
                    return [2 /*return*/, res.status(401).json({ auth: false, message: 'No token provided.' })];
                jsonwebtoken_1.default.verify(token, secret, function (err, decoded) {
                    if (err)
                        return res.status(500).json({ auth: false, message: '!Failed to authenticate token.' });
                    return res.status(200).json(decoded);
                });
                return [2 /*return*/];
            });
        });
    },
    permission: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token, instance;
            return __generator(this, function (_b) {
                _a = req.query, token = _a.token, instance = _a.instance;
                global._permissions.clear();
                token = token || req.headers['authorization'] || "Bearer ";
                token = token.replace('Bearer ', '');
                instance = instance || req.headers['instance'] || false;
                jsonwebtoken_1.default.verify(token, secret, function (err, decoded) {
                    return __awaiter(this, void 0, void 0, function () {
                        var permissions, i, module, items, m;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err)
                                        return [2 /*return*/, res.status(500).json({ auth: false, decoded: decoded, message: 'Failed to authenticate token!!!' })];
                                    if (instance == 'null') {
                                        res.status(201).json({ auth: false, decoded: decoded, error: {
                                                message: 'Instance not found!'
                                            } });
                                        return [2 /*return*/];
                                    }
                                    if (!instance) {
                                        res.status(201).json({ auth: false, decoded: decoded, error: {
                                                message: 'Instance not found!'
                                            } });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, Permission_1.default.permission_instance_user(instance, decoded.user)];
                                case 1:
                                    permissions = _a.sent();
                                    if (!permissions) {
                                        res.status(201).json({ auth: false, decoded: decoded, error: {
                                                message: 'Permission not found!!!',
                                                destroy_session: true
                                            } });
                                        return [2 /*return*/];
                                    }
                                    for (i in permissions.permissions) {
                                        module = permissions.permissions[i];
                                        console.log(module);
                                        if (permissions.permissions[module]) {
                                            if (!global._permissions[module]) {
                                                global._permissions[module] = {};
                                            }
                                            items = permissions.permissions[module];
                                            for (m in items) {
                                                global._permissions[module][m] = items[m];
                                            }
                                        }
                                    }
                                    next();
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    },
    authorize: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token, instance;
            return __generator(this, function (_b) {
                _a = req.query, token = _a.token, instance = _a.instance;
                token = token || req.headers['authorization'] || false;
                instance = instance || req.headers['instance'] || false;
                console.log('=====token', req.headers);
                // var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYmxhaCI6WzEsMiw1XSwiaWF0IjoxNjAyNjc2Mjg1LCJleHAiOjE5MTgwMzYyODV9._X1_onaUIJ8PsOZYh9A7ppOOjs3i8EaOR9W-zqqRkrA';
                if (!token)
                    return [2 /*return*/, res.status(401).json({ auth: false, message: 'No token provided.' })];
                token = token.split(' ').length > 1 ? token.split(' ')[1] : token;
                console.log(token);
                jsonwebtoken_1.default.verify(token, secret, function (err, decoded) {
                    if (err)
                        return res.status(500).json({ auth: false, decoded: decoded, message: 'Failed to authenticate token!' });
                    //   return res.status(200).json(decoded)
                    req.params.storage = {
                        user: decoded.user,
                        instance: instance || decoded.instance_id
                    };
                    global.storage = {
                        instance: instance || decoded.instance_id,
                        user: decoded.user
                    };
                    next();
                });
                return [2 /*return*/];
            });
        });
    },
    ok: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, res.status(500).json()];
            });
        });
    }
};
