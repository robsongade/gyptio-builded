"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Router = express_1.default.Router;
var Auth_1 = __importDefault(require("../controllers/Auth"));
var routerAuth = Router();
routerAuth.post('/auth', Auth_1.default.auth);
routerAuth.post('/auth-email', Auth_1.default.auth_email);
routerAuth.get('/verify', Auth_1.default.verify);
exports.default = routerAuth;
