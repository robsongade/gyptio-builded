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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var InstanceRelation_1 = require("./InstanceRelation");
var Group_1 = require("./Group");
var TypeInstance;
(function (TypeInstance) {
    TypeInstance["CHILD"] = "child";
    TypeInstance["MASTER"] = "master";
})(TypeInstance = exports.TypeInstance || (exports.TypeInstance = {}));
var InstanceStatus;
(function (InstanceStatus) {
    InstanceStatus["PENDING"] = "instance_pending";
    InstanceStatus["AWAITING_APPROVED"] = "instance_awaiting_approved";
    InstanceStatus["AWAITING_ACCEPT"] = "instance_awaiting_accept";
    InstanceStatus["ACTIVED"] = "instance_actived";
    InstanceStatus["REPROVED"] = "instance_reproved";
})(InstanceStatus = exports.InstanceStatus || (exports.InstanceStatus = {}));
var Instance = /** @class */ (function (_super) {
    __extends(Instance, _super);
    function Instance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Instance.prototype.checkLisense = function () {
        if (this.license && this.license != "") {
            if (this.type == TypeInstance.MASTER) {
                if (this.license == process.env.LICENSE) {
                    this.status = InstanceStatus.ACTIVED;
                }
                else {
                    this.status = InstanceStatus.PENDING;
                }
            }
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Instance.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        typeorm_1.Generated("uuid"),
        __metadata("design:type", String)
    ], Instance.prototype, "instance_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Instance.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Instance.prototype, "license", void 0);
    __decorate([
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Instance.prototype, "checkLisense", null);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: TypeInstance,
            default: "child"
        }),
        __metadata("design:type", String)
    ], Instance.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column({
            length: 255,
            nullable: true
        }),
        __metadata("design:type", String)
    ], Instance.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ type: 'jsonb', nullable: true }),
        __metadata("design:type", Object)
    ], Instance.prototype, "config", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: InstanceStatus,
            default: "instance_pending"
        }),
        __metadata("design:type", String)
    ], Instance.prototype, "status", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.instances; }),
        __metadata("design:type", User_1.User)
    ], Instance.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Group_1.Group; }, function (group) { return group.instance; }),
        __metadata("design:type", Array)
    ], Instance.prototype, "groups", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return InstanceRelation_1.InstanceRelation; }, function (instance_relation) { return instance_relation.instance; }),
        __metadata("design:type", Array)
    ], Instance.prototype, "instances_relation", void 0);
    __decorate([
        typeorm_1.RelationId(function (instance) { return instance.user; }),
        __metadata("design:type", String)
    ], Instance.prototype, "userId", void 0);
    Instance = __decorate([
        typeorm_1.Entity()
    ], Instance);
    return Instance;
}(typeorm_1.BaseEntity));
exports.Instance = Instance;
