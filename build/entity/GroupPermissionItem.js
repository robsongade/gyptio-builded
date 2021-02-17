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
exports.GroupPermissionItem = exports.ModuleItem = void 0;
var typeorm_1 = require("typeorm");
var Group_1 = require("./Group");
var Module_1 = require("./Module");
var ModuleItem;
(function (ModuleItem) {
    ModuleItem["LIST"] = "list";
    ModuleItem["SHOW"] = "show";
    ModuleItem["EDIT"] = "edit";
    ModuleItem["CREATE"] = "create";
    ModuleItem["DELETE"] = "delete";
    ModuleItem["IMPORT"] = "import";
    ModuleItem["EXPORT"] = "export";
})(ModuleItem = exports.ModuleItem || (exports.ModuleItem = {}));
var GroupPermissionItem = /** @class */ (function (_super) {
    __extends(GroupPermissionItem, _super);
    function GroupPermissionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], GroupPermissionItem.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], GroupPermissionItem.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], GroupPermissionItem.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({
            type: "enum",
            enum: ModuleItem,
            default: ModuleItem.SHOW,
        }),
        __metadata("design:type", String)
    ], GroupPermissionItem.prototype, "roles", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Group_1.Group; }, function (Group) { return Group.groups_permission_item; }),
        __metadata("design:type", Group_1.Group)
    ], GroupPermissionItem.prototype, "group", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Module_1.Module; }, function (module) { return module.groups_permission_item; }),
        __metadata("design:type", Module_1.Module
        // in order be able to fetch resources in admin-bro - we have to have id available
        )
    ], GroupPermissionItem.prototype, "module", void 0);
    __decorate([
        typeorm_1.RelationId(function (group_permission_item) { return group_permission_item.module; }),
        __metadata("design:type", Number)
    ], GroupPermissionItem.prototype, "moduleId", void 0);
    __decorate([
        typeorm_1.RelationId(function (group_permission_item) { return group_permission_item.group; }),
        __metadata("design:type", Number)
    ], GroupPermissionItem.prototype, "groupId", void 0);
    GroupPermissionItem = __decorate([
        typeorm_1.Entity()
    ], GroupPermissionItem);
    return GroupPermissionItem;
}(typeorm_1.BaseEntity));
exports.GroupPermissionItem = GroupPermissionItem;
