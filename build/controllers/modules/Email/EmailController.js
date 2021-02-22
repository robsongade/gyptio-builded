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
var express_1 = require("express");
var User_1 = require("../../../entity/User");
var crypto_1 = __importDefault(require("crypto"));
var handlebars_1 = __importDefault(require("handlebars"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var mailer_template_1 = __importDefault(require("./libs/mailer-template"));
var Email_1 = require("../../../entity/Email");
var Instance_1 = require("../../../entity/Instance");
var secret = process.env.SECRET || 'secret';
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var InstanceRelation_1 = require("../../../entity/InstanceRelation");
var EmailController = {
    anti_spam: {},
    transport: null,
    from: '',
    //TODO: criar fluxo de email definir se vai ficar ou não em memoria caso criar processo para 
    //liberar memoria
    run_anti_spam: function (instance, user_id) {
        if (instance === void 0) { instance = null; }
        if (user_id === void 0) { user_id = null; }
        if (!instance || !user_id) {
            if (!global.storage) {
                return;
            }
            if (global.storage.instance) {
                instance = global.storage.instance;
            }
            if (global.storage.user && global.storage.user.id) {
                user_id = global.storage.user.id;
            }
            if (!instance || !user_id) {
                return;
            }
        }
        if (!EmailController.anti_spam[instance]) {
            EmailController.anti_spam[instance] = {};
        }
        if (!EmailController.anti_spam[instance][user_id]) {
            EmailController.anti_spam[instance][user_id] = {};
        }
        var now = new Date();
        if (!EmailController.anti_spam[instance][user_id]['next_email']) {
            EmailController.anti_spam[instance][user_id]['next_email'] = {
                time: now
            };
        }
        if (now >= EmailController.anti_spam[instance][user_id]['next_email'].time) {
            now.setMinutes(now.getMinutes() + 5);
            EmailController.anti_spam[instance][user_id]['next_email'] = {
                time: now
            };
            EmailController.anti_spam[instance][user_id].released = true;
        }
        else {
            EmailController.anti_spam[instance][user_id].released = false;
        }
        return EmailController.anti_spam[instance][user_id];
    },
    config: function () {
        return __awaiter(this, void 0, void 0, function () {
            var test, instance, config_email, from, host, username, password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        EmailController.run_anti_spam();
                        test = true;
                        if (!global.storage || !global.storage.instance) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, Instance_1.Instance.findOne({
                                where: {
                                    instance_id: global.storage.instance
                                }
                            })];
                    case 1:
                        instance = _a.sent();
                        if (!instance) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, Email_1.Email.findOne({
                                where: {
                                    instance: instance
                                }
                            })];
                    case 2:
                        config_email = _a.sent();
                        if (!config_email) {
                            return [2 /*return*/, false];
                        }
                        from = config_email.from, host = config_email.host, username = config_email.username, password = config_email.password;
                        EmailController.from = from;
                        EmailController.transport = nodemailer_1.default.createTransport({
                            host: host,
                            port: 587,
                            auth: {
                                user: username,
                                pass: password,
                            },
                        });
                        return [2 /*return*/, { config_email: config_email, instance: instance }];
                }
            });
        });
    },
    get: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, response.status(200).send({
                        items: [{
                                name: "Hello World"
                            }]
                    })];
            });
        });
    },
    forgot_password: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var config_email, url_dashboard, email, user, code, now, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EmailController.config()];
                    case 1:
                        config_email = _a.sent();
                        if (global.storage.request.headers['referer']) {
                            url_dashboard = global.storage.request.headers['referer'];
                        }
                        else {
                            url_dashboard = global.storage.request.protocol + '://' + global.storage.request.get('host') + global.storage.request.originalUrl;
                        }
                        email = request.body.email;
                        return [4 /*yield*/, User_1.User.findOne({
                                where: {
                                    email: email
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, response.status(400).send({
                                    error: {
                                        message: "User not found!"
                                    }
                                })];
                        }
                        code = crypto_1.default.randomBytes(8).toString('hex');
                        now = new Date();
                        now.setHours(now.getHours() + 1);
                        token = jsonwebtoken_1.default.sign({ code: code, user: user }, secret, {
                            expiresIn: (60 * 60 * 24 * 1 * 1) // expires in 10 years
                        });
                        mailer_template_1.default.mailertemplate(__dirname + '/templates/auth/forgot-password.html', function (err, html) {
                            var template = handlebars_1.default.compile(html);
                            var replacements = {
                                token: token
                            };
                            var htmlToSend = template(replacements);
                            var mailOptions = {
                                from: EmailController.from,
                                to: email,
                                subject: 'Recuperação de senha',
                                html: htmlToSend
                            };
                            EmailController.transport.sendMail(mailOptions, function (error) {
                                if (error) {
                                    response.status(400).send({
                                        error: error
                                    });
                                }
                                else {
                                    response.status(200).send({
                                        sucess: 'ok'
                                    });
                                }
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    confirm: function (to, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var config_email, url_dashboard, user, anti_spam, time_validade_email, token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EmailController.config()];
                    case 1:
                        config_email = _a.sent();
                        if (!config_email) {
                            return [2 /*return*/, false];
                        }
                        if (global.storage.request.headers['referer']) {
                            url_dashboard = global.storage.request.headers['referer'];
                        }
                        else {
                            url_dashboard = global.storage.request.protocol + '://' + global.storage.request.get('host') + global.storage.request.originalUrl;
                        }
                        return [4 /*yield*/, User_1.User.findOne({
                                where: {
                                    email: to
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        anti_spam = EmailController.run_anti_spam(null, user.id);
                        if (anti_spam && !anti_spam.released) {
                            return [2 /*return*/, callback({
                                    released: false
                                })];
                        }
                        if (!user) {
                            return [2 /*return*/, express_1.response.status(400).send({
                                    error: {
                                        message: "User not found!"
                                    }
                                })];
                        }
                        time_validade_email = 60;
                        token = jsonwebtoken_1.default.sign({ user: { id: user.id } }, secret, {
                            expiresIn: (60) * (1 * (time_validade_email))
                        });
                        mailer_template_1.default.mailertemplate(__dirname + '/templates/auth/confirm-email.html', function (err, html) { return __awaiter(_this, void 0, void 0, function () {
                            var template, replacements, htmlToSend, mailOptions;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        template = handlebars_1.default.compile(html);
                                        replacements = {
                                            link: url_dashboard + "#/email/confirm?token=" + token
                                        };
                                        htmlToSend = template(replacements);
                                        mailOptions = {
                                            from: EmailController.from,
                                            to: to,
                                            subject: 'Confirmação de email',
                                            html: htmlToSend
                                        };
                                        return [4 /*yield*/, EmailController.transport.sendMail(mailOptions, function (error) {
                                                if (error) {
                                                    console.log("error", error, config_email);
                                                    callback(false);
                                                }
                                                else {
                                                    callback({ url_dashboard: url_dashboard });
                                                }
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    },
    confirm_email: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = request.query.token;
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(token, secret, function (err, decoded) { return __awaiter(_this, void 0, void 0, function () {
                                var findEmail, token_email_validate, findEmail_VERIFIED;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, InstanceRelation_1.InstanceRelation.findOne({
                                                where: {
                                                    status_email: InstanceRelation_1.InstanceRelationalEmail.PENDING,
                                                    user: decoded.user.id
                                                }
                                            })];
                                        case 1:
                                            findEmail = _a.sent();
                                            if (!findEmail) return [3 /*break*/, 3];
                                            return [4 /*yield*/, InstanceRelation_1.InstanceRelation.update(findEmail.id, {
                                                    status_email: InstanceRelation_1.InstanceRelationalEmail.VERIFIED
                                                })];
                                        case 2:
                                            _a.sent();
                                            token_email_validate = jsonwebtoken_1.default.sign({ user: {
                                                    id: decoded.user.id,
                                                    instance: findEmail
                                                } }, secret, {
                                                expiresIn: (60) * (1 * 60)
                                            });
                                            return [2 /*return*/, response.status(200).json({
                                                    'success': 'Email validado com sucesso!',
                                                    'token_email_validate': token_email_validate
                                                })];
                                        case 3: return [4 /*yield*/, InstanceRelation_1.InstanceRelation.findOne({
                                                where: {
                                                    status_email: InstanceRelation_1.InstanceRelationalEmail.VERIFIED,
                                                    user: decoded.user.id
                                                }
                                            })];
                                        case 4:
                                            findEmail_VERIFIED = _a.sent();
                                            if (findEmail_VERIFIED) {
                                                return [2 /*return*/, response.status(200).json({
                                                        'error': {
                                                            message: 'Esse email já foi verificado anteriormente!'
                                                        }
                                                    })];
                                            }
                                            else {
                                                return [2 /*return*/, response.status(200).json({
                                                        'error': {
                                                            message: 'Não foi possivel encontra o email!'
                                                        }
                                                    })];
                                            }
                                            _a.label = 5;
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    count: 0,
    test: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = request.query.token;
                        EmailController.count++;
                        EmailController.config();
                        return [2 /*return*/, response.json({ EmailController: EmailController })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
};
exports.default = EmailController;
