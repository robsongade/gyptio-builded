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
var GroupPermissionItem_1 = require("./GroupPermissionItem");
var Instance_1 = require("./Instance");
var InstanceRelationGroup_1 = require("./InstanceRelationGroup");
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Group.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            length: 50
        }),
        __metadata("design:type", String)
    ], Group.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({
            length: 255,
            nullable: true
        }),
        __metadata("design:type", String)
    ], Group.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({
            default: false
        }),
        __metadata("design:type", Boolean)
    ], Group.prototype, "default", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Instance_1.Instance; }, function (intance) { return intance.groups; }),
        __metadata("design:type", Instance_1.Instance)
    ], Group.prototype, "instance", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return GroupPermissionItem_1.GroupPermissionItem; }, function (group_permission_item) { return group_permission_item.module; }),
        __metadata("design:type", Array)
    ], Group.prototype, "groups_permission_item", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return InstanceRelationGroup_1.InstanceRelationGroup; }, function (InstanceRelationGroup) { return InstanceRelationGroup.group; }),
        __metadata("design:type", Array)
    ], Group.prototype, "instances_relation_group", void 0);
    __decorate([
        typeorm_1.RelationId(function (group) { return group.instance; }),
        __metadata("design:type", Number)
    ], Group.prototype, "instanceId", void 0);
    Group = __decorate([
        typeorm_1.Entity()
    ], Group);
    return Group;
}(typeorm_1.BaseEntity));
exports.Group = Group;
//# sourceMappingURL=Group.js.map