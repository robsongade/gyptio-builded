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
var NetworkToDonationController_1 = require("./NetworkToDonationController");
var Netwok3x3_1 = __importDefault(require("./networks/Netwok3x3"));
exports.notExistsQuery = function (builder) { return "not exists (" + builder.getQuery() + ")"; };
var node_fetch_1 = __importDefault(require("node-fetch"));
var isStart = false;
var PingApi;
var cronRun;
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
var NetworkCronController = /** @class */ (function () {
    function NetworkCronController() {
        this.serverCron = null;
        this.isRun = false;
        this.cron1 = null;
        this.id = null;
        this.networks = null;
        this.isStart = false;
    }
    NetworkCronController.prototype.start = function (req, res) {
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
    NetworkCronController.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count;
            var _this = this;
            return __generator(this, function (_a) {
                count = 0;
                //loadPingApi();
                console.log("cron init");
                clearInterval(cronRun);
                cronRun = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("+++++++++LOG CRON++++++++++++", NetworkCron.isRun, NetworkCron.isStart);
                                if (!NetworkCron.isStart) return [3 /*break*/, 4];
                                // clearInterval(PingApi)
                                this.isRun = true;
                                return [4 /*yield*/, this.GetListNetworks()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.GetListUsersToNetwork()
                                    //Verificar se em usuario em networkuser que ainda não esta em network to donation
                                ];
                            case 2:
                                _a.sent();
                                //Verificar se em usuario em networkuser que ainda não esta em network to donation
                                return [4 /*yield*/, this.processToDonation()
                                    //this.isRun = false
                                ];
                            case 3:
                                //Verificar se em usuario em networkuser que ainda não esta em network to donation
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                console.log("+++++++++CLEAR CRON++++++++++++", NetworkCron.isRun, NetworkCron.isStart);
                                NetworkCron.isStart = false;
                                clearInterval(cronRun);
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); }, 1000);
                return [2 /*return*/];
            });
        });
    };
    NetworkCronController.prototype.startCron = function (req, res) {
        if (req === void 0) { req = null; }
        if (res === void 0) { res = null; }
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!NetworkCron.isStart) return [3 /*break*/, 2];
                        status = true;
                        NetworkCron.isStart = true;
                        return [4 /*yield*/, NetworkCron.init()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (res)
                            res.json({
                                status: status ? 'Is run now' : 'Is run'
                            });
                        return [2 /*return*/];
                }
            });
        });
    };
    NetworkCronController.prototype.CheckPayment = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //TODO: verificar se o sujeito esta apito gerar rede
                if ("check payments" === "check payments") {
                }
                return [2 /*return*/];
            });
        });
    };
    NetworkCronController.prototype.GetListNetworks = function () {
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
    NetworkCronController.prototype.checkNewUser = function (network) {
        return __awaiter(this, void 0, void 0, function () {
            var findUsersReference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Indicator_1.Indicator.createQueryBuilder("indicator")
                            .where(exports.notExistsQuery(NetworkUser_1.NetworkUser
                            .createQueryBuilder('network_user')
                            .where('network_user.currentUser = indicator.indicatorUser and network_user.network = ' + network.id)))
                            .getOne()];
                    case 1:
                        findUsersReference = _a.sent();
                        return [2 /*return*/, findUsersReference];
                }
            });
        });
    };
    NetworkCronController.prototype.GetListUsersToNetwork = function () {
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
                                return [4 /*yield*/, this.checkNewUser(network)];
                            case 2:
                                findUsersReference = _a.sent();
                                if (!findUsersReference) return [3 /*break*/, 5];
                                if (!(network.type == Network_1.NetworkTypes.network3x3)) return [3 /*break*/, 4];
                                return [4 /*yield*/, Netwok3x3_1.default.apply_user(findUsersReference, network)];
                            case 3:
                                _a.sent();
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
                            case 7: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    NetworkCronController.prototype.processToDonation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var check_users_to_donation;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.check_users_to_donation()];
                            case 1:
                                check_users_to_donation = _a.sent();
                                if (check_users_to_donation) {
                                    NetworkCron.isStart = true;
                                    this.processToDonation();
                                }
                                else {
                                    NetworkCron.isStart = false;
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, 500);
                return [2 /*return*/];
            });
        });
    };
    //Verificar para quem o novo usuario ira fazer a doação
    NetworkCronController.prototype.check_users_to_donation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, toDonation, UsersToDonation, x, findUserToDonation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultado = [];
                        toDonation = new NetworkToDonationController_1.NetworkToDonationController();
                        UsersToDonation = null;
                        x = 1;
                        _a.label = 1;
                    case 1:
                        if (!(x <= Netwok3x3_1.default.nivels)) return [3 /*break*/, 5];
                        return [4 /*yield*/, NetworkUser_1.NetworkUser.createQueryBuilder("network_user")
                                .where(("not exists (SELECT 1 FROM network_to_donation where \n                network_to_donation.currentUserId = network_user.currentUserId \n                and network_to_donation.nivel = " + x + ") and network_user.nivel = 1 and network_user.referenceUserId > 0 group by network_user.currentUserId").replace(/(\r\n|\n|\r)/gm, ""))
                                .getOne()];
                    case 2:
                        findUserToDonation = _a.sent();
                        if (!findUserToDonation) return [3 /*break*/, 4];
                        findUserToDonation.nivel = x;
                        UsersToDonation = ({
                            nullReference: false,
                            UserToDonation: findUserToDonation
                        });
                        return [4 /*yield*/, toDonation.process(UsersToDonation.UserToDonation, UsersToDonation.nullReference)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        x++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, UsersToDonation];
                }
            });
        });
    };
    NetworkCronController.prototype.test_check_users_to_donation = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = res.status(200)).json;
                        _c = {};
                        return [4 /*yield*/, NetworkCron.check_users_to_donation()];
                    case 1:
                        _b.apply(_a, [(_c.findUsersToDonation = _d.sent(),
                                _c)]);
                        return [2 /*return*/];
                }
            });
        });
    };
    return NetworkCronController;
}());
var NetworkCron = new NetworkCronController();
exports.default = NetworkCron;
