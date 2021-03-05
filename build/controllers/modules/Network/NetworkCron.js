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
var Indicator_1 = require("../../../entity/modules/Indicator/Indicator");
var Network_1 = require("../../../entity/modules/Network/Network");
var NetworkUser_1 = require("../../../entity/modules/NetworkUser/NetworkUser");
var Netwok3x3_1 = __importDefault(require("./networks/Netwok3x3"));
exports.notExistsQuery = function (builder) { return "not exists (" + builder.getQuery() + ")"; };
var node_fetch_1 = __importDefault(require("node-fetch"));
var isStart = false;
var PingApi;
var loadPingApi = function () {
    PingApi = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
        var response, _a, message, stop;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default('http://localhost:' + process.env.PORT + '/api/network/config')];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()
                        //  clearInterval(PingApi)
                    ];
                case 2:
                    _a = _b.sent(), message = _a.message, stop = _a.stop;
                    //  clearInterval(PingApi)
                    if (stop) {
                        clearInterval(PingApi);
                    }
                    if (message) {
                        isStart = true;
                    }
                    else {
                        isStart = false;
                    }
                    console.log("======PING");
                    return [2 /*return*/];
            }
        });
    }); }, 1000);
};
var NetworkCron = /** @class */ (function () {
    function NetworkCron() {
        this.isRun = false;
        this.cron1 = null;
        this.id = null;
        this.networks = null;
        this.isStart = false;
    }
    NetworkCron.prototype.start = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.isStart = true;
                res.send({
                    isStart: this.isStart
                });
                return [2 /*return*/];
            });
        });
    };
    NetworkCron.prototype.init = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var count;
            var _this = this;
            return __generator(this, function (_a) {
                this.id = id || -1;
                count = 0;
                loadPingApi();
                console.log("cron init");
                setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(!this.isRun && isStart)) return [3 /*break*/, 3];
                                clearInterval(PingApi);
                                this.isRun = true;
                                return [4 /*yield*/, this.GetListNetworks()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.GetListUsersToNetwork()
                                    //this.isRun = false
                                ];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, 500);
                return [2 /*return*/];
            });
        });
    };
    NetworkCron.prototype.CheckPayment = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //TODO: verificar se o sujeito esta apito gerar rede
                if ("check payments" === "check payments") {
                }
                return [2 /*return*/];
            });
        });
    };
    NetworkCron.prototype.GetListNetworks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var findNetworks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Network_1.Network.find()];
                    case 1:
                        findNetworks = _a.sent();
                        this.networks = findNetworks;
                        return [2 /*return*/];
                }
            });
        });
    };
    NetworkCron.prototype.GetListUsersToNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count;
            var _this = this;
            return __generator(this, function (_a) {
                count = 0;
                if (this.networks.length == 0) {
                    this.isRun = false;
                    return [2 /*return*/];
                }
                this.networks.forEach(function (network) { return __awaiter(_this, void 0, void 0, function () {
                    var findUsersReference, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                count++;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 6, , 7]);
                                return [4 /*yield*/, Indicator_1.Indicator.createQueryBuilder("indicator")
                                        .where(exports.notExistsQuery(NetworkUser_1.NetworkUser
                                        .createQueryBuilder('network_user')
                                        .where('network_user.currentUser = indicator.indicatorUser and network_user.network = ' + network.id)))
                                        .getOne()];
                            case 2:
                                findUsersReference = _a.sent();
                                if (!findUsersReference) return [3 /*break*/, 5];
                                if (!(network.type == Network_1.NetworkTypes.network3x3)) return [3 /*break*/, 4];
                                return [4 /*yield*/, Netwok3x3_1.default.apply_user(findUsersReference, network)];
                            case 3:
                                _a.sent();
                                this.isRun = false;
                                _a.label = 4;
                            case 4: return [3 /*break*/, 5];
                            case 5:
                                if (this.networks.length == count) {
                                }
                                return [3 /*break*/, 7];
                            case 6:
                                e_1 = _a.sent();
                                console.log('E:', e_1.message);
                                process.exit();
                                return [3 /*break*/, 7];
                            case 7:
                                this.isRun = false;
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return NetworkCron;
}());
exports.default = new NetworkCron();
