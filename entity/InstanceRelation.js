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
var Instance_1 = require("./Instance");
var InstanceRelationGroup_1 = require("./InstanceRelationGroup");
var InstanceRelationalStatus;
(function (InstanceRelationalStatus) {
    InstanceRelationalStatus["PENDING"] = "user_instance_pending";
    InstanceRelationalStatus["AWAITING_APPROVED"] = "user_instance_awaiting_approved";
    InstanceRelationalStatus["AWAITING_ACCEPT"] = "user_instance_awaiting_accept";
    InstanceRelationalStatus["ACTIVED"] = "user_instance_actived";
    InstanceRelationalStatus["REPROVED"] = "user_instance_reproved";
})(InstanceRelationalStatus = exports.InstanceRelationalStatus || (exports.InstanceRelationalStatus = {}));
var InstanceRelation = /** @class */ (function (_super) {
    __extends(InstanceRelation, _super);
    function InstanceRelation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], InstanceRelation.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Generated('uuid'),
        __metadata("design:type", String)
    ], InstanceRelation.prototype, "user_id_instance", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.instances_relation; }),
        __metadata("design:type", User_1.User)
    ], InstanceRelation.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Instance_1.Instance; }, function (instance) { return instance.instances_relation; }),
        __metadata("design:type", Instance_1.Instance)
    ], InstanceRelation.prototype, "instance", void 0);
    __decorate([
        typeorm_1.Column({
            type: "enum",
            default: InstanceRelationalStatus.PENDING,
            enum: InstanceRelationalStatus,
        }),
        __metadata("design:type", String)
    ], InstanceRelation.prototype, "status", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return InstanceRelationGroup_1.InstanceRelationGroup; }, function (instance_relation_group) { return instance_relation_group.instanceRelationId; }),
        __metadata("design:type", Array)
    ], InstanceRelation.prototype, "instance_relation_group", void 0);
    __decorate([
        typeorm_1.RelationId(function (instance_relation) { return instance_relation.user; }),
        __metadata("design:type", Number)
    ], InstanceRelation.prototype, "userId", void 0);
    __decorate([
        typeorm_1.RelationId(function (instance_relation) { return instance_relation.instance; }),
        __metadata("design:type", Number)
    ], InstanceRelation.prototype, "instanceId", void 0);
    InstanceRelation = __decorate([
        typeorm_1.Entity()
    ], InstanceRelation);
    return InstanceRelation;
}(typeorm_1.BaseEntity));
exports.InstanceRelation = InstanceRelation;
