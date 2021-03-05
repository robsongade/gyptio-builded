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
var Network_1 = require("../Network/Network");
var InstanceRelation_1 = require("../../InstanceRelation");
var NetworkUserStatus;
(function (NetworkUserStatus) {
    NetworkUserStatus["pendent"] = "PENDENTE";
    NetworkUserStatus["completed"] = "COMPLETED";
})(NetworkUserStatus = exports.NetworkUserStatus || (exports.NetworkUserStatus = {}));
var NetworkUser = /** @class */ (function (_super) {
    __extends(NetworkUser, _super);
    function NetworkUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], NetworkUser.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Network_1.Network; }),
        __metadata("design:type", Network_1.Network)
    ], NetworkUser.prototype, "network", void 0);
    __decorate([
        typeorm_1.RelationId(function (network_user) { return network_user.network; }),
        __metadata("design:type", Network_1.Network)
    ], NetworkUser.prototype, "networkId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return InstanceRelation_1.InstanceRelation; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], NetworkUser.prototype, "currentUser", void 0);
    __decorate([
        typeorm_1.RelationId(function (network_user) { return network_user.currentUser; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], NetworkUser.prototype, "currentUserId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return InstanceRelation_1.InstanceRelation; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], NetworkUser.prototype, "referenceUser", void 0);
    __decorate([
        typeorm_1.RelationId(function (network_user) { return network_user.referenceUser; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], NetworkUser.prototype, "referenceUserId", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'int',
            default: 0,
        }),
        __metadata("design:type", Number)
    ], NetworkUser.prototype, "nivel", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'int',
            default: 0,
        }),
        __metadata("design:type", Number)
    ], NetworkUser.prototype, "nivel_global", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: NetworkUserStatus,
            default: NetworkUserStatus.pendent
        }),
        __metadata("design:type", String)
    ], NetworkUser.prototype, "status", void 0);
    NetworkUser = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique("index_network_user", ["network", "currentUser", "referenceUser"])
    ], NetworkUser);
    return NetworkUser;
}(typeorm_1.BaseEntity));
exports.NetworkUser = NetworkUser;
