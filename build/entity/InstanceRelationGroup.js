"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
exports.InstanceRelationGroup = void 0;
var typeorm_1 = require("typeorm");
var Group_1 = require("./Group");
var InstanceRelation_1 = require("./InstanceRelation");
var InstanceRelationGroup = /** @class */ (function (_super) {
    __extends(InstanceRelationGroup, _super);
    function InstanceRelationGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], InstanceRelationGroup.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return InstanceRelation_1.InstanceRelation; }, function (instance_relation) { return instance_relation.instance_relation_group; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], InstanceRelationGroup.prototype, "instanceRelation", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Group_1.Group; }, function (group) { return group.instances_relation_group; }),
        __metadata("design:type", Group_1.Group)
    ], InstanceRelationGroup.prototype, "group", void 0);
    __decorate([
        typeorm_1.RelationId(function (relation) { return relation.instanceRelation; }),
        __metadata("design:type", Number)
    ], InstanceRelationGroup.prototype, "instanceRelationId", void 0);
    __decorate([
        typeorm_1.RelationId(function (relation) { return relation.group; }),
        __metadata("design:type", Number)
    ], InstanceRelationGroup.prototype, "groupId", void 0);
    InstanceRelationGroup = __decorate([
        typeorm_1.Entity()
    ], InstanceRelationGroup);
    return InstanceRelationGroup;
}(typeorm_1.BaseEntity));
exports.InstanceRelationGroup = InstanceRelationGroup;
