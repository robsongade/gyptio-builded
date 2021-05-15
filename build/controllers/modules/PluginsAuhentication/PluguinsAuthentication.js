"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PluguinsAuthentication = /** @class */ (function () {
    function PluguinsAuthentication() {
    }
    PluguinsAuthentication.prototype.init = function () {
        if (process.env.auth_plugin) {
            return process.env.auth_plugin;
        }
        return false;
    };
    PluguinsAuthentication.prototype.auth = function (req) {
        var token = req.query.token;
        if (token) {
            return true;
        }
    };
    return PluguinsAuthentication;
}());
exports.PluguinsAuthentication = PluguinsAuthentication;
