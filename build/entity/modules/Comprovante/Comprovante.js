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
var ContaDeposito_1 = require("../ContaDeposito/ContaDeposito");
var NetworkToDonation_1 = require("../NetworkToDonation/NetworkToDonation");
var StatusComprovante;
(function (StatusComprovante) {
    StatusComprovante["NOVO"] = "novo";
    StatusComprovante["ATUALIZADO"] = "atualizado";
    StatusComprovante["REJEITADO"] = "rejeitado";
    StatusComprovante["VISUALIZADO"] = "visualizado";
    StatusComprovante["APROVADO"] = "aprovado";
    StatusComprovante["AUTO_APROVADO"] = "auto_aprovado";
})(StatusComprovante = exports.StatusComprovante || (exports.StatusComprovante = {}));
var Comprovante = /** @class */ (function (_super) {
    __extends(Comprovante, _super);
    function Comprovante() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Comprovante.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 255,
            default: ''
        }),
        __metadata("design:type", String)
    ], Comprovante.prototype, "imagem", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (networkToDonation) { return NetworkToDonation_1.NetworkToDonation; }, function (networkToDonation) { return networkToDonation.id; }),
        __metadata("design:type", NetworkToDonation_1.NetworkToDonation)
    ], Comprovante.prototype, "networkToDonation", void 0);
    __decorate([
        typeorm_1.RelationId(function (comprovante) { return comprovante.networkToDonation; }),
        __metadata("design:type", NetworkToDonation_1.NetworkToDonation)
    ], Comprovante.prototype, "networkToDonationId", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 255,
            default: ''
        }),
        __metadata("design:type", String)
    ], Comprovante.prototype, "motivo_rejecao", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: ContaDeposito_1.TipoContaDeposito,
            default: ContaDeposito_1.TipoContaDeposito.KUICK
        }),
        __metadata("design:type", String)
    ], Comprovante.prototype, "tipo_conta_deposito", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: StatusComprovante,
            default: StatusComprovante.NOVO
        }),
        __metadata("design:type", String)
    ], Comprovante.prototype, "status", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Comprovante.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Comprovante.prototype, "updated_at", void 0);
    Comprovante = __decorate([
        typeorm_1.Entity()
    ], Comprovante);
    return Comprovante;
}(typeorm_1.BaseEntity));
exports.Comprovante = Comprovante;
