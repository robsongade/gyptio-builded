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
var InstanceRelation_1 = require("../../InstanceRelation");
var typeorm_1 = require("typeorm");
var TipoContaDeposito;
(function (TipoContaDeposito) {
    TipoContaDeposito["PIX"] = "pix";
    TipoContaDeposito["MERCADOPAGO"] = "mercadopago";
    TipoContaDeposito["PICPAY"] = "picpay";
    TipoContaDeposito["KUICK"] = "kuick";
})(TipoContaDeposito = exports.TipoContaDeposito || (exports.TipoContaDeposito = {}));
var StatusContaDeposito;
(function (StatusContaDeposito) {
    StatusContaDeposito["ATIVO"] = "ativo";
    StatusContaDeposito["BLOQUEADO"] = "bloqueado";
    StatusContaDeposito["INATIVO"] = "inativo";
})(StatusContaDeposito = exports.StatusContaDeposito || (exports.StatusContaDeposito = {}));
var ContaDeposito = /** @class */ (function (_super) {
    __extends(ContaDeposito, _super);
    function ContaDeposito() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], ContaDeposito.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return InstanceRelation_1.InstanceRelation; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], ContaDeposito.prototype, "userAccountInstance", void 0);
    __decorate([
        typeorm_1.RelationId(function (network_user) { return network_user.userAccountInstance; }),
        __metadata("design:type", InstanceRelation_1.InstanceRelation)
    ], ContaDeposito.prototype, "userAccountInstanceId", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: TipoContaDeposito,
            default: TipoContaDeposito.KUICK
        }),
        __metadata("design:type", String)
    ], ContaDeposito.prototype, "tipo_conta", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 20,
        }),
        __metadata("design:type", String)
    ], ContaDeposito.prototype, "tipo_conta_adicional", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 50,
            default: ''
        }),
        __metadata("design:type", String)
    ], ContaDeposito.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 50,
            default: ''
        }),
        __metadata("design:type", String)
    ], ContaDeposito.prototype, "telefone", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 50,
            default: ''
        }),
        __metadata("design:type", String)
    ], ContaDeposito.prototype, "usuario", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 100,
            default: ''
        }),
        __metadata("design:type", String)
    ], ContaDeposito.prototype, "nome_completo", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: StatusContaDeposito,
            default: StatusContaDeposito.ATIVO
        }),
        __metadata("design:type", String)
    ], ContaDeposito.prototype, "status", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], ContaDeposito.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], ContaDeposito.prototype, "updated_at", void 0);
    ContaDeposito = __decorate([
        typeorm_1.Entity()
    ], ContaDeposito);
    return ContaDeposito;
}(typeorm_1.BaseEntity));
exports.ContaDeposito = ContaDeposito;
