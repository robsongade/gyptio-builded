"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Router = express_1.default.Router;
var Auth_1 = __importDefault(require("../controllers/Auth"));
var routerAuth = Router();
var express_recaptcha_1 = require("express-recaptcha");
routerAuth.post('/auth', function (req, res, next) {
    var recaptcha = new express_recaptcha_1.RecaptchaV2('6LeIx1waAAAAABS77aDV72YU6nIioHEzPJhmIY_O', '6LeIx1waAAAAADNkavv-6o9sDvawHHSY0bTOGcSX');
    recaptcha.verify(req, function (error, data) {
        if (!error) {
            // success code
            next();
        }
        else {
            return res.send({ error: { message: "recaptcha error", error: error } });
        }
    });
});
routerAuth.post('/auth', Auth_1.default.auth);
routerAuth.post('/auth-email', Auth_1.default.auth_email);
routerAuth.get('/verify', Auth_1.default.verify);
exports.default = routerAuth;
