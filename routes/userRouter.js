"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var User_1 = require("./../controllers/User");
var Auth_1 = __importDefault(require("../controllers/Auth"));
var Instances_1 = __importDefault(require("../controllers/Instances"));
var Router = express_1.default.Router;
var userRouter = Router();
var User = new User_1.UserController();
userRouter.post('/register', User.create);
userRouter.post('/user', Auth_1.default.permission, Auth_1.default.authorize, User.users);
userRouter.get('/user', Auth_1.default.authorize, User.user);
userRouter.get('/user/aprove/:user_id', Auth_1.default.permission, Auth_1.default.authorize, Instances_1.default.pin_confirm_on_have_permission);
userRouter.post('/user/edit', Auth_1.default.authorize, User.edit);
/*
userRouter.get('/user/load-invitation',auth.authorize,User.loadInvitation)
userRouter.post('/user/create-invitation',auth.authorize,User.confirm_user_invitation)
userRouter.post('/user/search-by-email',auth.authorize,User.SearchByEmail)
userRouter.get('/user/:user_id',auth.authorize,User.user)
userRouter.post('/user/edit/:user_id',auth.authorize,User.edit)

userRouter.get('/user/aprove/:user_id',auth.authorize,instance.pin_confirm_on_have_permission)
*/
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map