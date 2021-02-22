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
Object.defineProperty(exports, "__esModule", { value: true });
exports.install1613538623502 = void 0;
var install1613538623502 = /** @class */ (function () {
    function install1613538623502() {
        this.name = 'install1613538623502';
    }
    install1613538623502.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"module\" (\"id\" SERIAL NOT NULL, \"name\" character varying(50) NOT NULL, \"description\" character varying(255), \"code\" character varying(20) NOT NULL, CONSTRAINT \"UQ_1ccb6257978189bc9d5e0bedf76\" UNIQUE (\"code\"), CONSTRAINT \"PK_0e20d657f968b051e674fbe3117\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"group_permission_item_roles_enum\" AS ENUM('list', 'show', 'edit', 'create', 'delete', 'import', 'export')")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"group_permission_item\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"description\" character varying NOT NULL, \"roles\" \"group_permission_item_roles_enum\" NOT NULL DEFAULT 'show', \"groupId\" integer, \"moduleId\" integer, CONSTRAINT \"PK_f52acd526a9b6c68cc45f00264e\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"group\" (\"id\" SERIAL NOT NULL, \"name\" character varying(50) NOT NULL, \"description\" character varying(255), \"default\" boolean NOT NULL DEFAULT false, \"instanceId\" integer, CONSTRAINT \"PK_256aa0fda9b1de1a73ee0b7106b\" PRIMARY KEY (\"id\"))")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"instance_relation_group\" (\"id\" SERIAL NOT NULL, \"instanceRelationId\" integer, \"groupId\" integer, CONSTRAINT \"PK_296b4d0cd6154f625d5537f5d27\" PRIMARY KEY (\"id\"))")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"instance_relation_status_email_enum\" AS ENUM('pending_email', 'verified_email')")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"instance_relation_status_enum\" AS ENUM('user_instance_pending', 'user_instance_awaiting_approved', 'user_instance_awaiting_accept', 'user_instance_actived', 'user_instance_reproved')")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"instance_relation\" (\"id\" SERIAL NOT NULL, \"user_id_instance\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"validated_email\" boolean NOT NULL DEFAULT false, \"status_email\" \"instance_relation_status_email_enum\" NOT NULL DEFAULT 'pending_email', \"status\" \"instance_relation_status_enum\" NOT NULL DEFAULT 'user_instance_pending', \"userId\" uuid, \"instanceId\" integer, CONSTRAINT \"PK_2ef8c8a41ebbdc0d27e8f5cb3d3\" PRIMARY KEY (\"id\"))")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"user_role_enum\" AS ENUM('staff', 'user')")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"user\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"fullName\" character varying, \"username\" character varying, \"email\" character varying NOT NULL, \"url_image\" character varying, \"password\" character varying NOT NULL, \"role\" \"user_role_enum\" NOT NULL DEFAULT 'user', \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"UQ_78a916df40e02a9deb1c4b75edb\" UNIQUE (\"username\"), CONSTRAINT \"UQ_e12875dfb3b1d92d7d7c5377e22\" UNIQUE (\"email\"), CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"instance_type_enum\" AS ENUM('child', 'master')")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"instance_status_enum\" AS ENUM('instance_pending', 'instance_awaiting_approved', 'instance_awaiting_accept', 'instance_actived', 'instance_reproved')")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"instance\" (\"id\" SERIAL NOT NULL, \"instance_id\" uuid DEFAULT uuid_generate_v4(), \"name\" character varying NOT NULL, \"license\" character varying, \"type\" \"instance_type_enum\" NOT NULL DEFAULT 'child', \"description\" character varying(255), \"config\" jsonb, \"status\" \"instance_status_enum\" NOT NULL DEFAULT 'instance_pending', \"userId\" uuid, CONSTRAINT \"PK_eaf60e4a0c399c9935413e06474\" PRIMARY KEY (\"id\"))")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"email\" (\"id\" SERIAL NOT NULL, \"from\" character varying NOT NULL, \"host\" character varying NOT NULL, \"username\" character varying NOT NULL, \"password\" character varying NOT NULL, \"instanceId\" integer, CONSTRAINT \"PK_1e7ed8734ee054ef18002e29b1c\" PRIMARY KEY (\"id\"))")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"characters_type_enum\" AS ENUM('Archer', 'Paladin', 'Lancer', 'Berserker')")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"characters\" (\"id\" SERIAL NOT NULL, \"type\" \"characters_type_enum\" NOT NULL DEFAULT 'Archer', \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_9d731e05758f26b9315dac5e378\" PRIMARY KEY (\"id\"))")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"server_game_status_enum\" AS ENUM('server_game_off', 'server_game_on', 'server_game_maintainer_on', 'server_game_maintainer_off')")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"server_game\" (\"id\" SERIAL NOT NULL, \"name\" character varying(50) NOT NULL, \"description\" character varying(255), \"instance_id\" integer NOT NULL, \"status\" \"server_game_status_enum\" NOT NULL DEFAULT 'server_game_off', \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"UQ_26df495e4762fa06af5fb8fcdec\" UNIQUE (\"instance_id\"), CONSTRAINT \"PK_57db731af837223cc40d8acada8\" PRIMARY KEY (\"id\"))")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"player\" (\"id\" SERIAL NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"user\" character varying(36) NOT NULL, \"servergameId\" integer, CONSTRAINT \"PK_65edadc946a7faf4b638d5e8885\" PRIMARY KEY (\"id\"))")];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"character\" (\"id\" SERIAL NOT NULL, \"char_name\" character varying(50) NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"charactersId\" integer, \"playerId\" integer, CONSTRAINT \"PK_6c4aec48c564968be15078b8ae5\" PRIMARY KEY (\"id\"))")];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"item\" (\"id\" SERIAL NOT NULL, \"names\" character varying NOT NULL, \"description\" character varying, CONSTRAINT \"PK_d3c0c71f23e7adcf952a1d13423\" PRIMARY KEY (\"id\"))")];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"test\" (\"id\" SERIAL NOT NULL, \"names\" character varying NOT NULL, \"description\" character varying, \"sotesteId\" uuid, CONSTRAINT \"PK_5417af0062cf987495b611b59c7\" PRIMARY KEY (\"id\"))")];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"group_permission_item\" ADD CONSTRAINT \"FK_2f4d722e4cdb7c383ddd3beb516\" FOREIGN KEY (\"groupId\") REFERENCES \"group\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"group_permission_item\" ADD CONSTRAINT \"FK_58b82c9167c277c441c8b81508b\" FOREIGN KEY (\"moduleId\") REFERENCES \"module\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"group\" ADD CONSTRAINT \"FK_f626bcb8c85a48fbf6e69252e84\" FOREIGN KEY (\"instanceId\") REFERENCES \"instance\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"instance_relation_group\" ADD CONSTRAINT \"FK_96e07d11e902c1fdcaae1c96162\" FOREIGN KEY (\"instanceRelationId\") REFERENCES \"instance_relation\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"instance_relation_group\" ADD CONSTRAINT \"FK_6bed99537c29c93868c5685a75c\" FOREIGN KEY (\"groupId\") REFERENCES \"group\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 27:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"instance_relation\" ADD CONSTRAINT \"FK_efe12370bce1a19f6e1581a0ecd\" FOREIGN KEY (\"userId\") REFERENCES \"user\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 28:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"instance_relation\" ADD CONSTRAINT \"FK_357699070ef6ada894759d3d377\" FOREIGN KEY (\"instanceId\") REFERENCES \"instance\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 29:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"instance\" ADD CONSTRAINT \"FK_0cd9a4bd7c4efdb0e79fabc854b\" FOREIGN KEY (\"userId\") REFERENCES \"user\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 30:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"email\" ADD CONSTRAINT \"FK_0eab39482dde55f1dac5d3cfaa2\" FOREIGN KEY (\"instanceId\") REFERENCES \"instance\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 31:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"player\" ADD CONSTRAINT \"FK_c1b10e0c265598160e33bae93c0\" FOREIGN KEY (\"servergameId\") REFERENCES \"server_game\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 32:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"character\" ADD CONSTRAINT \"FK_142d7383097ec7bc9a379f2f2a0\" FOREIGN KEY (\"charactersId\") REFERENCES \"characters\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 33:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"character\" ADD CONSTRAINT \"FK_5b277d0c9baa952e5c9a95e59a5\" FOREIGN KEY (\"playerId\") REFERENCES \"player\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 34:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"test\" ADD CONSTRAINT \"FK_16c4131306032470fff9ed3b7e1\" FOREIGN KEY (\"sotesteId\") REFERENCES \"user\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 35:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    install1613538623502.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"test\" DROP CONSTRAINT \"FK_16c4131306032470fff9ed3b7e1\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"character\" DROP CONSTRAINT \"FK_5b277d0c9baa952e5c9a95e59a5\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"character\" DROP CONSTRAINT \"FK_142d7383097ec7bc9a379f2f2a0\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"player\" DROP CONSTRAINT \"FK_c1b10e0c265598160e33bae93c0\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"email\" DROP CONSTRAINT \"FK_0eab39482dde55f1dac5d3cfaa2\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"instance\" DROP CONSTRAINT \"FK_0cd9a4bd7c4efdb0e79fabc854b\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"instance_relation\" DROP CONSTRAINT \"FK_357699070ef6ada894759d3d377\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"instance_relation\" DROP CONSTRAINT \"FK_efe12370bce1a19f6e1581a0ecd\"")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"instance_relation_group\" DROP CONSTRAINT \"FK_6bed99537c29c93868c5685a75c\"")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"instance_relation_group\" DROP CONSTRAINT \"FK_96e07d11e902c1fdcaae1c96162\"")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"group\" DROP CONSTRAINT \"FK_f626bcb8c85a48fbf6e69252e84\"")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"group_permission_item\" DROP CONSTRAINT \"FK_58b82c9167c277c441c8b81508b\"")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"group_permission_item\" DROP CONSTRAINT \"FK_2f4d722e4cdb7c383ddd3beb516\"")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"test\"")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"item\"")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"character\"")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"player\"")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"server_game\"")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"server_game_status_enum\"")];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"characters\"")];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"characters_type_enum\"")];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"email\"")];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"instance\"")];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"instance_status_enum\"")];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"instance_type_enum\"")];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"user\"")];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"user_role_enum\"")];
                    case 27:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"instance_relation\"")];
                    case 28:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"instance_relation_status_enum\"")];
                    case 29:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"instance_relation_status_email_enum\"")];
                    case 30:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"instance_relation_group\"")];
                    case 31:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"group\"")];
                    case 32:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"group_permission_item\"")];
                    case 33:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"group_permission_item_roles_enum\"")];
                    case 34:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"module\"")];
                    case 35:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return install1613538623502;
}());
exports.install1613538623502 = install1613538623502;
