"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Instance_1 = require("./Instance");
var InstanceRelation_1 = require("./InstanceRelation");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var UserRoles;
(function (UserRoles) {
    UserRoles["STAFF"] = "staff";
    UserRoles["USER"] = "user";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.encryptPassword = function () {
        var salt = bcryptjs_1.default.genSaltSync(10);
        this.password = bcryptjs_1.default.hashSync(this.password, salt);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "fullName", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true,
            unique: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column({
            unique: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true,
        }),
        __metadata("design:type", String)
    ], User.prototype, "url_image", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "encryptPassword", null);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: UserRoles,
            default: "user"
        }),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], User.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], User.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Instance_1.Instance; }, function (instance) { return instance.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "instances", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return InstanceRelation_1.InstanceRelation; }, function (instance_relation) { return instance_relation.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "instances_relation", void 0);
    User = __decorate([
        typeorm_1.Entity('user')
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.User = User;
