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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
//const HtmlTableToJson = require('html-table-to-json');
var html_table_to_json_1 = __importDefault(require("html-table-to-json"));
var ExtractDataUrl = /** @class */ (function () {
    function ExtractDataUrl() {
        this.url = 'https://www.ojogodobicho.com/deu_no_poste.htm';
        this.Mes = {
            "Janeiro": "01",
            "Fevereiro": "02",
            "Março": "03",
            "Abril": "04",
            "Maio": "05",
            "Junho": "06",
            "Julho": "07",
            "Agosto": "08",
            "Setembro": "09",
            "Outubro": "10",
            "Novembro": "11",
            "Dezembro": "12",
        };
        this.procurar_em = "";
        this.sorteios_template = {
            PTM: [],
            PT: [],
            PTV: [],
            FED: [],
            COR: []
        };
        this.sorteios = {
            PTM: [],
            PT: [],
            PTV: [],
            FED: [],
            COR: []
        };
        this.sorteio = {};
    }
    ExtractDataUrl.prototype.setUrl = function (url) {
        this.url = url;
    };
    ExtractDataUrl.prototype.tem = function (procurar) {
        return this.procurar_em.indexOf(procurar) >= 0;
    };
    ExtractDataUrl.prototype.pegabico = function (split) {
        var _this = this;
        var html_bichos = split; //split[1]
        html_bichos = html_bichos.replace('<tbody>', '<split_tbody>');
        html_bichos = html_bichos.replace('</tbody>', '<split_tbody>');
        html_bichos = html_bichos.split('<split_tbody>')[1];
        this.procurar_em = html_bichos;
        while (this.tem('<tr>') || this.tem('</tr>')) {
            html_bichos = html_bichos.replace('<tr>', '<item_sorteio>');
            html_bichos = html_bichos.replace('</tr>', '<item_sorteio>');
            this.procurar_em = html_bichos;
        }
        html_bichos = html_bichos.split('<item_sorteio>');
        console.log(html_bichos);
        var bichos = [];
        var i = 0;
        //var resultados_com_bicho : any = {}
        var resultados_com_bicho = {
            PTM: [],
            PT: [],
            PTV: [],
            FED: [],
            COR: []
        };
        html_bichos.forEach(function (element) {
            element = '<div>' + element + '</div>';
            console.log('element', element);
            var elemento_filho = element;
            _this.procurar_em = elemento_filho;
            while (_this.tem('<td class="ylig" title=') || _this.tem('</td>') || _this.tem('<td class="yesc" title=') || _this.tem('<td class="yesc" title=')) {
                elemento_filho = elemento_filho.replace('<td class="ylig" title=', "<split_elemento_filho_" + i + ">");
                elemento_filho = elemento_filho.replace('</td>', "<split_elemento_filho_" + i + ">");
                elemento_filho = elemento_filho.replace('<td class="yesc" title=', "<split_elemento_filho_" + i + ">");
                elemento_filho = elemento_filho.replace('<td class="yesc" title=', "<split_elemento_filho_" + i + ">");
                elemento_filho = elemento_filho.replace('<td class="yesc">', "<split_elemento_filho_" + i + ">");
                // elemento_filho = elemento_filho.replace('"',`<split_elemento_filho_${i}>`)
                _this.procurar_em = elemento_filho;
            }
            var split_elemento_filho = elemento_filho.split("<split_elemento_filho_" + i + ">");
            if (split_elemento_filho[3]) {
                resultados_com_bicho.PTM.push(split_elemento_filho[3]);
            }
            if (split_elemento_filho[5]) {
                resultados_com_bicho.PT.push(split_elemento_filho[5]);
            }
            if (split_elemento_filho[7]) {
                resultados_com_bicho.PTV.push(split_elemento_filho[7]);
            }
            if (split_elemento_filho[9]) {
                resultados_com_bicho.FED.push(split_elemento_filho[9]);
            }
            if (split_elemento_filho[11]) {
                resultados_com_bicho.COR.push(split_elemento_filho[11]);
            }
            //console.log('split_elemento_filho',split_elemento_filho,)
            i++;
        });
        return resultados_com_bicho;
    };
    ExtractDataUrl.prototype.ojogodobichoToJson = function (data) {
        while (data.indexOf('<table class="twelve">') > 0 || data.indexOf('</table>') > 0) {
            data = data.replace('<table class="twelve">', "<split>");
            data = data.replace('</table>', "<split>");
            data = data.replace('</table>', "<split>");
        }
        var split = data.split('<split>');
        var remota_tabela = "<table>" + split[1] + "</table>";
        // console.log(`<table>${split[1]}</table>`)
        var titulo_data = split[1];
        while (titulo_data.indexOf('caption') > 0) {
            titulo_data = titulo_data.replace('<caption>', "<titulo_data>");
            titulo_data = titulo_data.replace('</caption>', "<titulo_data>");
        }
        titulo_data = titulo_data.split('<titulo_data>')[1];
        var jsonTables = html_table_to_json_1.default.parse(remota_tabela);
        var resultado = this.trata_resultado(jsonTables.results);
        return {
            titulo_data: titulo_data,
            data: this.data(titulo_data),
            resultado: resultado
        };
    };
    ExtractDataUrl.prototype.data = function (data) {
        var nova_data = data.split(' de ');
        console.log(nova_data);
        var dia = nova_data[0].split(',')[1];
        this.procurar_em = dia;
        while (this.tem(' ')) {
            dia = dia.replace(' ', '');
            this.procurar_em = dia;
        }
        return nova_data[2] + "-" + this.Mes[nova_data[1]] + "-" + dia;
    };
    ExtractDataUrl.prototype.sincroniza = function (ordenacao) {
        // var resultado;
        console.log(this.sorteio);
        for (var i in this.sorteios_template) {
            if (!this.sorteios[i]) {
                this.sorteios[i] = [];
            }
            var split = this.sorteio[i].split('-');
            if (split[0] && split[1]) {
                this.sorteios[i].push({
                    resultado_do_sorteio: split[0],
                    numero_do_bicho: split[1],
                    codigo_periodo: i,
                    ordenacao: ordenacao
                });
                console.log('test', i);
            }
        }
        return;
    };
    ExtractDataUrl.prototype.trata_resultado = function (resultado) {
        var _this = this;
        resultado.forEach(function (sorteio) {
            _this.sorteio = {};
            var ordenacao = 1;
            sorteio.forEach(function (item) {
                _this.sorteio = item;
                _this.sincroniza(ordenacao);
                ordenacao += 1;
            });
        });
        return this.sorteios;
    };
    ExtractDataUrl.prototype.ojogodobicho_com = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            node_fetch_1.default(_this.url).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, new Promise(function (resolve) {
                                                response.text().then(function (text) {
                                                    resolve(text);
                                                });
                                            })
                                            //return response.json();
                                        ];
                                        case 1: 
                                        // The API call was successful!
                                        return [2 /*return*/, _a.sent()
                                            //return response.json();
                                        ];
                                    }
                                });
                            }); }).then(function (data) {
                                resolve(_this.ojogodobichoToJson(data));
                            }).catch(function (err) {
                                // There was an error
                                resolve(false);
                                // console.warn('Something went wrong.', err);
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ExtractDataUrl;
}());
exports.extractDataUrl = new ExtractDataUrl();
var loadCron = function () { return __awaiter(_this, void 0, void 0, function () {
    var port, result, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                port = process.env.PORT || 3003;
                return [4 /*yield*/, node_fetch_1.default('http://localhost:' + port + '/api/ojogo', {
                        method: 'get',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    })];
            case 1:
                result = _d.sent();
                _b = (_a = console).log;
                _c = ["Cron O Jogo do bicho OK", 'http://localhost:' + port + '/api/ojogo'];
                return [4 /*yield*/, result.json()];
            case 2:
                _b.apply(_a, _c.concat([_d.sent()]));
                return [2 /*return*/];
        }
    });
}); };
exports.loadCronJogoDoBicho = function () { return __awaiter(_this, void 0, void 0, function () {
    var time_cron, loadAnterior;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadCron()];
            case 1:
                _a.sent();
                time_cron = process.env.CRON_JOGO_TEMPO || 60000;
                loadAnterior = true;
                setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!loadAnterior) return [3 /*break*/, 2];
                                loadAnterior = false;
                                return [4 /*yield*/, loadCron()];
                            case 1:
                                _a.sent();
                                loadAnterior = false;
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); }, time_cron || 60000);
                return [2 /*return*/];
        }
    });
}); };
