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
exports.Indicator = void 0;
var InstanceRelation_1 = require("./../../InstanceRelation");
var typeorm_1 = require("typeorm");
var Indicator = /** @class */ (function (_super) {
    __extends(Indicator, _super);
    function Indicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Indicator.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return InstanceRelation_1.InstanceRelation; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], Indicator.prototype, "indicatorUser", void 0);
    __decorate([
        typeorm_1.RelationId(function (indicator) { return indicator.indicatorUser; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], Indicator.prototype, "indicatorUserId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return InstanceRelation_1.InstanceRelation; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], Indicator.prototype, "referenceUser", void 0);
    __decorate([
        typeorm_1.RelationId(function (indicator) { return indicator.referenceUser; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], Indicator.prototype, "referenceUserId", void 0);
    Indicator = __decorate([
        typeorm_1.Entity()
    ], Indicator);
    return Indicator;
}(typeorm_1.BaseEntity));
exports.Indicator = Indicator;
