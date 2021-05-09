"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var util_1 = require("util");
//const FileType = require('file-type');
var unlinkAsync = util_1.promisify(fs_1.default.unlink);
var ComprovanteController = /** @class */ (function () {
    function ComprovanteController() {
    }
    return ComprovanteController;
}());
exports.ComprovanteController = ComprovanteController;
