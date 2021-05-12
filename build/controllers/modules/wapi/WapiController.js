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
exports.default = {
    info: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.status(200).json({
                    qrcode: 'data:image/png;base64,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'
                });
                return [2 /*return*/];
            });
        });
    }
};
