"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalData = /** @class */ (function () {
    function GlobalData() {
    }
    GlobalData.prototype.get = function () {
    };
    GlobalData.prototype.set = function () {
    };
    GlobalData.prototype.Storage = function () {
        return global.storage;
    };
    return GlobalData;
}());
exports.GlobalData = GlobalData;
