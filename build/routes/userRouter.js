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
var express_recaptcha_1 = require("express-recaptcha");
var recaptcha = new express_recaptcha_1.RecaptchaV2('6LeIx1waAAAAABS77aDV72YU6nIioHEzPJhmIY_O', '6LeIx1waAAAAADNkavv-6o9sDvawHHSY0bTOGcSX');
userRouter.use('/register', recaptcha.middleware.verify, function (req, res, next) {
    if (!req.recaptcha.error) {
        // success code
        next();
    }
    else {
        return res.send({ error: { message: "recaptcha error" } });
    }
});
userRouter.post('/register', User.create);
userRouter.get('/user/permissions', Auth_1.default.permission, Auth_1.default.authorize, User.permission);
userRouter.post('/user', Auth_1.default.permission, Auth_1.default.authorize, User.users);
userRouter.get('/user', Auth_1.default.authorize, User.user);
userRouter.get('/user/:user_id_instance', Auth_1.default.authorize, User.user);
userRouter.get('/user/aprove/:user_id', Auth_1.default.permission, Auth_1.default.authorize, Instances_1.default.pin_confirm_on_have_permission);
userRouter.post('/user/edit', Auth_1.default.authorize, User.edit);
userRouter.post('/user/edit/instance', Auth_1.default.permission, Auth_1.default.authorize, User.edit_instance);
/*
userRouter.get('/user/load-invitation',auth.authorize,User.loadInvitation)
userRouter.post('/user/create-invitation',auth.authorize,User.confirm_user_invitation)
userRouter.post('/user/search-by-email',auth.authorize,User.SearchByEmail)
userRouter.get('/user/:user_id',auth.authorize,User.user)
userRouter.post('/user/edit/:user_id',auth.authorize,User.edit)

userRouter.get('/user/aprove/:user_id',auth.authorize,instance.pin_confirm_on_have_permission)
*/
exports.default = userRouter;
