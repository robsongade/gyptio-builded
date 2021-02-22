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
var Instance_1 = require("./../../Instance");
var NetworkTypes;
(function (NetworkTypes) {
    NetworkTypes["network3x3"] = "3x3";
    NetworkTypes["network_test"] = "test";
})(NetworkTypes = exports.NetworkTypes || (exports.NetworkTypes = {}));
var Network = /** @class */ (function (_super) {
    __extends(Network, _super);
    function Network() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Network.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            default: NetworkTypes.network3x3,
            enum: NetworkTypes
        }),
        __metadata("design:type", String)
    ], Network.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 20,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Network.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Instance_1.Instance; }),
        __metadata("design:type", Instance_1.Instance)
    ], Network.prototype, "instance", void 0);
    __decorate([
        typeorm_1.RelationId(function (network) { return network.instance; }),
        __metadata("design:type", Instance_1.Instance)
    ], Network.prototype, "instanceId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return InstanceRelation_1.InstanceRelation; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], Network.prototype, "accountSystem", void 0);
    __decorate([
        typeorm_1.RelationId(function (network) { return network.accountSystem; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], Network.prototype, "accountSystemId", void 0);
    Network = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique("index_network", ["instance", "type"])
    ], Network);
    return Network;
}(typeorm_1.BaseEntity));
exports.Network = Network;
