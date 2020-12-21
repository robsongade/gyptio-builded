"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ItemController_1 = __importDefault(require("../controllers/modules/Item/ItemController"));
var Router = express_1.default.Router;
var itemRouter = Router();
itemRouter.get('/item', ItemController_1.default.get);
exports.default = itemRouter;
