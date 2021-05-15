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
var OJogoDoBicho_1 = require("../../../entity/modules/OJogoDoBicho/OJogoDoBicho");
var ExtractDataUrl_1 = require("../../../libs/ExtractDataUrl");
var PluguinsAuthentication_1 = require("../PluginsAuhentication/PluguinsAuthentication");
var ojogo = {
    pupular_na_base: function (dados) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            var _this = this;
            return __generator(this, function (_a) {
                data = dados.data;
                for (item in dados.resultado) {
                    dados.resultado[item].forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                        var numero_do_bicho, codigo_periodo, resultado_do_sorteio, ordenacao, buscaJogo;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(item.numero_do_bicho != '0')) return [3 /*break*/, 5];
                                    console.log('item.numero_do_bicho', item);
                                    numero_do_bicho = item.numero_do_bicho, codigo_periodo = item.codigo_periodo, resultado_do_sorteio = item.resultado_do_sorteio, ordenacao = item.ordenacao;
                                    return [4 /*yield*/, OJogoDoBicho_1.JogoDoBicho.findOne({
                                            where: {
                                                codigo_periodo: codigo_periodo,
                                                data: data,
                                                ordenacao: ordenacao
                                            }
                                        })];
                                case 1:
                                    buscaJogo = _a.sent();
                                    if (!(!buscaJogo || !buscaJogo.id)) return [3 /*break*/, 3];
                                    console.log("\n          inseriou buscaJogo====\n          \n          \n          ", buscaJogo);
                                    return [4 /*yield*/, OJogoDoBicho_1.JogoDoBicho.insert({
                                            codigo_periodo: codigo_periodo,
                                            data: data,
                                            numero_do_bicho: numero_do_bicho,
                                            resultado_do_sorteio: resultado_do_sorteio,
                                            ordenacao: ordenacao
                                        })];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, OJogoDoBicho_1.JogoDoBicho.update(buscaJogo.id, {
                                        codigo_periodo: codigo_periodo,
                                        data: data,
                                        numero_do_bicho: numero_do_bicho,
                                        resultado_do_sorteio: resultado_do_sorteio,
                                        ordenacao: ordenacao
                                    })];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    },
    resultado: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var busca_resultado, resultado, PTM, data, titulo_data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ExtractDataUrl_1.extractDataUrl.ojogodobicho_com()];
                    case 1:
                        busca_resultado = _a.sent();
                        resultado = busca_resultado.resultado;
                        if (!resultado) return [3 /*break*/, 3];
                        PTM = resultado.PTM;
                        data = busca_resultado.data, titulo_data = busca_resultado.titulo_data;
                        //var resultado_site = await extractDataUrl.ojogodobicho_com()
                        return [4 /*yield*/, ojogo.pupular_na_base({
                                resultado: resultado,
                                data: data
                            })];
                    case 2:
                        //var resultado_site = await extractDataUrl.ojogodobicho_com()
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                //  resultado_site,
                                PTM: PTM,
                                data: data,
                                titulo_data: titulo_data
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    dataAtualFormatada: function () {
        var data = new Date(), dia = data.getDate().toString(), diaF = (dia.length == 1) ? '0' + dia : dia, mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes, anoF = data.getFullYear();
        return diaF + "/" + mesF + "/" + anoF;
    },
    dataAtual: function () {
        var data = new Date(), dia = data.getDate().toString(), diaF = (dia.length == 1) ? '0' + dia : dia, mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes, anoF = data.getFullYear();
        return anoF + "/" + mesF + "/" + diaF;
    },
    dia: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, resultado_dia;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = ojogo.dataAtual();
                        return [4 /*yield*/, OJogoDoBicho_1.JogoDoBicho.find({
                                data: data
                            })];
                    case 1:
                        resultado_dia = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                resultado_dia: resultado_dia
                            })];
                }
            });
        });
    },
    auth_render: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.sendFile(__dirname + '/plugin/auth_render.html');
                return [2 /*return*/];
            });
        });
    },
    auth: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var plugin_auth;
            return __generator(this, function (_a) {
                if (!process.env.AUTH_PLUGIN) {
                    next();
                    return [2 /*return*/];
                }
                plugin_auth = new PluguinsAuthentication_1.PluguinsAuthentication();
                if (req.path != "/jogo/auth" && !plugin_auth.auth(req)) {
                    return [2 /*return*/, res.json({
                            redirect: '/jogo/auth'
                        })];
                }
                if (req.path == "/jogo/auth") {
                    if (plugin_auth.auth(req)) {
                        return [2 /*return*/, res.json({
                                redirect: '/'
                            })];
                    }
                }
                if (req.path == "/jogo/auth") {
                    ojogo.auth_render(req, res);
                }
                return [2 /*return*/];
            });
        });
    }
};
exports.default = ojogo;
