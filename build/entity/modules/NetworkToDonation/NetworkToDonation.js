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
var InstanceRelation_1 = require("./../../InstanceRelation");
var typeorm_1 = require("typeorm");
var Network_1 = require("../Network/Network");
var NetworkToDonation = /** @class */ (function (_super) {
    __extends(NetworkToDonation, _super);
    function NetworkToDonation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], NetworkToDonation.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Network_1.Network; }),
        __metadata("design:type", Network_1.Network)
    ], NetworkToDonation.prototype, "network", void 0);
    __decorate([
        typeorm_1.RelationId(function (network_user) { return network_user.network; }),
        __metadata("design:type", Network_1.Network)
    ], NetworkToDonation.prototype, "networkId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return InstanceRelation_1.InstanceRelation; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], NetworkToDonation.prototype, "currentUser", void 0);
    __decorate([
        typeorm_1.RelationId(function (network_user) { return network_user.currentUser; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], NetworkToDonation.prototype, "currentUserId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return InstanceRelation_1.InstanceRelation; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], NetworkToDonation.prototype, "referenceUser", void 0);
    __decorate([
        typeorm_1.RelationId(function (network_user) { return network_user.referenceUser; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], NetworkToDonation.prototype, "referenceUserId", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'int',
            default: 0,
        }),
        __metadata("design:type", Number)
    ], NetworkToDonation.prototype, "nivel", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], NetworkToDonation.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], NetworkToDonation.prototype, "updated_at", void 0);
    NetworkToDonation = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique("index_network_user", ["nivel", "currentUser"])
    ], NetworkToDonation);
    return NetworkToDonation;
}(typeorm_1.BaseEntity));
exports.NetworkToDonation = NetworkToDonation;
