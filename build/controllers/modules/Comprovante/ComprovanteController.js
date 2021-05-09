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
var NetworkToDonation_1 = require("../../../entity/modules/NetworkToDonation/NetworkToDonation");
var InstanceRelation_1 = require("../../../entity/InstanceRelation");
var Instance_1 = require("../../../entity/Instance");
var ContaDeposito_1 = require("../../../entity/modules/ContaDeposito/ContaDeposito");
var Comprovante_1 = require("../../../entity/modules/Comprovante/Comprovante");
var fs_1 = __importDefault(require("fs"));
var util_1 = require("util");
var FileType = require('file-type');
var unlinkAsync = util_1.promisify(fs_1.default.unlink);
var ComprovanteController = /** @class */ (function () {
    function ComprovanteController() {
    }
    ComprovanteController.prototype.upline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var findUplinesToDonation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkToDonation_1.NetworkToDonation.find({
                            where: {
                                referenceUserId: 4
                            }
                        })];
                    case 1:
                        findUplinesToDonation = _a.sent();
                        return [2 /*return*/, findUplinesToDonation];
                }
            });
        });
    };
    ComprovanteController.prototype.all = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, _a, user, instance, userId, findInstance, findUser, findUplinesToDonation, uplines, count, uplines;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        resultado = [];
                        _a = global.storage, user = _a.user, instance = _a.instance;
                        userId = user.id;
                        return [4 /*yield*/, Instance_1.Instance.findOne({
                                where: {
                                    instance_id: instance
                                }
                            })];
                    case 1:
                        findInstance = _b.sent();
                        return [4 /*yield*/, InstanceRelation_1.InstanceRelation.findOne({
                                where: {
                                    user: userId,
                                    instance: findInstance
                                }
                            })];
                    case 2:
                        findUser = _b.sent();
                        return [4 /*yield*/, NetworkToDonation_1.NetworkToDonation.find({
                                where: {
                                    currentUser: findUser,
                                },
                                order: {
                                    created_at: "DESC"
                                }
                            })];
                    case 3:
                        findUplinesToDonation = _b.sent();
                        uplines = [];
                        count = 0;
                        return [4 /*yield*/, Promise.all(findUplinesToDonation.map(function (donation) { return __awaiter(_this, void 0, void 0, function () {
                                var conta, name, account_kuik, payments, findComprovantes, data, upline;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, ContaDeposito_1.ContaDeposito.find({
                                                where: {
                                                    userAccountInstance: donation.referenceUserId
                                                }
                                            })];
                                        case 1:
                                            conta = _a.sent();
                                            name = '';
                                            payments = [];
                                            conta.forEach(function (c) {
                                                var _c = c;
                                                _c.icon = _c.tipo_conta + '.png';
                                                if (c.tipo_conta == ContaDeposito_1.TipoContaDeposito.KUICK) {
                                                    name = _c.nome_completo;
                                                    account_kuik = _c;
                                                }
                                                else {
                                                    payments.push(_c);
                                                }
                                            });
                                            return [4 /*yield*/, Comprovante_1.Comprovante.findOne({
                                                    where: {
                                                        networkToDonation: donation.id
                                                    }
                                                })];
                                        case 2:
                                            findComprovantes = _a.sent();
                                            data = new Date(donation.created_at);
                                            data.setHours(data.getHours() + 48);
                                            upline = {
                                                nivel: donation.nivel,
                                                name: name,
                                                account_kuik: account_kuik,
                                                payments: payments,
                                                comprovante: {
                                                    data_inicio: data,
                                                    dados: findComprovantes ? findComprovantes : {}
                                                }
                                            };
                                            uplines.push(upline);
                                            count++;
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 4:
                        _b.sent();
                        uplines = uplines;
                        uplines = uplines.sort(function (a, b) {
                            return a.nivel - b.nivel;
                        });
                        //const upline =  findUplinesToDonation
                        res.status(200).json({
                            result: {
                                uplines: uplines
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ComprovanteController.prototype.dados = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, user, instance, userId, findInstance, findUser, findComprovantes, findUplinesToDonation, uplines, count, uplines;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = global.storage, user = _a.user, instance = _a.instance;
                        userId = user.id;
                        return [4 /*yield*/, Instance_1.Instance.findOne({
                                where: {
                                    instance_id: instance
                                }
                            })];
                    case 1:
                        findInstance = _b.sent();
                        return [4 /*yield*/, InstanceRelation_1.InstanceRelation.findOne({
                                where: {
                                    user: userId,
                                    instance: findInstance
                                }
                            })];
                    case 2:
                        findUser = _b.sent();
                        return [4 /*yield*/, Comprovante_1.Comprovante.findOne({
                                where: {
                                    id: id
                                }
                            })];
                    case 3:
                        findComprovantes = _b.sent();
                        if (!findComprovantes) {
                            return [2 /*return*/, res.status(200).json({
                                    error: true
                                })];
                        }
                        return [4 /*yield*/, NetworkToDonation_1.NetworkToDonation.find({
                                where: {
                                    currentUser: findUser,
                                    id: findComprovantes.networkToDonationId
                                },
                                order: {
                                    created_at: "DESC"
                                }
                            })];
                    case 4:
                        findUplinesToDonation = _b.sent();
                        uplines = [];
                        count = 0;
                        return [4 /*yield*/, Promise.all(findUplinesToDonation.map(function (donation) { return __awaiter(_this, void 0, void 0, function () {
                                var conta, name, account_kuik, payments, data, upline;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, ContaDeposito_1.ContaDeposito.find({
                                                where: {
                                                    userAccountInstance: donation.referenceUserId
                                                }
                                            })];
                                        case 1:
                                            conta = _a.sent();
                                            name = '';
                                            payments = [];
                                            conta.forEach(function (c) {
                                                var _c = c;
                                                _c.icon = _c.tipo_conta + '.png';
                                                if (c.tipo_conta == ContaDeposito_1.TipoContaDeposito.KUICK) {
                                                    name = _c.nome_completo;
                                                    account_kuik = _c;
                                                }
                                                else {
                                                    payments.push(_c);
                                                }
                                            });
                                            data = new Date(donation.created_at);
                                            data.setHours(data.getHours() + 48);
                                            upline = {
                                                nivel: donation.nivel,
                                                name: name,
                                                account_kuik: account_kuik,
                                                payments: payments,
                                                comprovante: {
                                                    data_inicio: data,
                                                    dados: findComprovantes ? findComprovantes : {}
                                                }
                                            };
                                            uplines.push(upline);
                                            count++;
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 5:
                        _b.sent();
                        uplines = uplines;
                        uplines = uplines.sort(function (a, b) {
                            return a.nivel - b.nivel;
                        });
                        //const upline =  findUplinesToDonation
                        res.status(200).json({
                            result: {
                                upline: uplines.length ? uplines[0] : {}
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ComprovanteController.prototype.upload = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findComprovante, imagem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Comprovante_1.Comprovante.findOne(id)];
                    case 1:
                        findComprovante = _a.sent();
                        if (!(findComprovante && findComprovante.imagem)) return [3 /*break*/, 3];
                        if (!fs_1.default.existsSync('upload/' + findComprovante.imagem)) return [3 /*break*/, 3];
                        return [4 /*yield*/, unlinkAsync('upload/' + findComprovante.imagem)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        imagem = req.file.filename;
                        return [4 /*yield*/, Comprovante_1.Comprovante.update(id, {
                                imagem: imagem
                            })];
                    case 4:
                        _a.sent();
                        res.status(200).json({
                            file: req.file,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ComprovanteController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var imagem, findComprovante, file, content_time, img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        imagem = req.params.imagem;
                        return [4 /*yield*/, Comprovante_1.Comprovante.findOne({
                                where: {
                                    imagem: imagem
                                }
                            })];
                    case 1:
                        findComprovante = _a.sent();
                        file = __dirname + '/../../../../upload/' + findComprovante.imagem;
                        return [4 /*yield*/, FileType.fromFile(file)];
                    case 2:
                        content_time = _a.sent();
                        img = fs_1.default.readFileSync(file);
                        res.writeHead(200, { 'Content-Type': content_time.mime });
                        res.end(img, 'binary');
                        res.status(200).json({ content_time: content_time });
                        return [2 /*return*/];
                }
            });
        });
    };
    ComprovanteController.prototype.create_por_upline = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, tipo_conta, _a, user, instance, userId, findInstance, findUser, findUplinesToDonation, id_comprovante, findComprovatne, create, save;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        tipo_conta = req.body.tipo_conta;
                        _a = global.storage, user = _a.user, instance = _a.instance;
                        userId = user.id;
                        return [4 /*yield*/, Instance_1.Instance.findOne({
                                where: {
                                    instance_id: instance
                                }
                            })];
                    case 1:
                        findInstance = _b.sent();
                        return [4 /*yield*/, InstanceRelation_1.InstanceRelation.findOne({
                                where: {
                                    user: userId,
                                    instance: findInstance
                                }
                            })];
                    case 2:
                        findUser = _b.sent();
                        return [4 /*yield*/, NetworkToDonation_1.NetworkToDonation.findOne({
                                where: {
                                    currentUser: findUser,
                                    referenceUser: id
                                },
                                order: {
                                    created_at: "DESC"
                                }
                            })];
                    case 3:
                        findUplinesToDonation = _b.sent();
                        if (!findUplinesToDonation) {
                            return [2 /*return*/, res.status(200).json({
                                    'error': true
                                })];
                        }
                        if (!!tipo_conta) return [3 /*break*/, 4];
                        return [2 /*return*/, res.status(200).json({
                                'error': true
                            })];
                    case 4: return [4 /*yield*/, Comprovante_1.Comprovante.findOne({
                            networkToDonation: findUplinesToDonation
                        })];
                    case 5:
                        findComprovatne = _b.sent();
                        if (!!findComprovatne) return [3 /*break*/, 7];
                        create = Comprovante_1.Comprovante.create({
                            networkToDonation: findUplinesToDonation,
                            tipo_conta_deposito: tipo_conta
                        });
                        return [4 /*yield*/, create.save()];
                    case 6:
                        save = _b.sent();
                        id_comprovante = save.id;
                        return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, res.status(200).json({
                            'error': 3
                        })];
                    case 8:
                        res.status(200).json({
                            id_comprovante: id_comprovante
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return ComprovanteController;
}());
exports.ComprovanteController = ComprovanteController;
