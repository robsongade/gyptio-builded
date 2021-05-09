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
var NetworkToDonation_1 = require("../NetworkToDonation/NetworkToDonation");
var NetworkUser_1 = require("../NetworkUser/NetworkUser");
var NewtworkRepasseMotivo;
(function (NewtworkRepasseMotivo) {
    NewtworkRepasseMotivo["AGUARDANDO_CONFIRMACOES"] = "aguardando_confirmacoes";
    NewtworkRepasseMotivo["INATIVO"] = "inativo";
    NewtworkRepasseMotivo["FALTOU_DADOS_BANCARIOS"] = "faltou_dados_bancarios"; // Não tinha dados bancarios cadastrado
})(NewtworkRepasseMotivo = exports.NewtworkRepasseMotivo || (exports.NewtworkRepasseMotivo = {}));
var NewtworkRepasseStatus;
(function (NewtworkRepasseStatus) {
    NewtworkRepasseStatus["PENDENTE"] = "pendente";
    NewtworkRepasseStatus["PROCESSANDO"] = "processando";
    NewtworkRepasseStatus["CONCLUIDO"] = "concluido";
})(NewtworkRepasseStatus = exports.NewtworkRepasseStatus || (exports.NewtworkRepasseStatus = {}));
var NetworkRepasse = /** @class */ (function (_super) {
    __extends(NetworkRepasse, _super);
    function NetworkRepasse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], NetworkRepasse.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return NetworkUser_1.NetworkUser; }),
        __metadata("design:type", NetworkUser_1.NetworkUser)
    ], NetworkRepasse.prototype, "networkUser", void 0);
    __decorate([
        typeorm_1.RelationId(function (network_user) { return network_user.networkUser; }),
        __metadata("design:type", NetworkUser_1.NetworkUser)
    ], NetworkRepasse.prototype, "networkUserId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return NetworkToDonation_1.NetworkToDonation; }),
        __metadata("design:type", NetworkToDonation_1.NetworkToDonation)
    ], NetworkRepasse.prototype, "networkToDonation", void 0);
    __decorate([
        typeorm_1.RelationId(function (network_to_donation) { return network_to_donation.networkToDonation; }),
        __metadata("design:type", NetworkToDonation_1.NetworkToDonation)
    ], NetworkRepasse.prototype, "networkToDonationId", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            default: NewtworkRepasseMotivo.AGUARDANDO_CONFIRMACOES,
            enum: NewtworkRepasseMotivo
        }),
        __metadata("design:type", String)
    ], NetworkRepasse.prototype, "motivo", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            default: NewtworkRepasseStatus.PENDENTE,
            enum: NewtworkRepasseStatus
        }),
        __metadata("design:type", String)
    ], NetworkRepasse.prototype, "status", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], NetworkRepasse.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], NetworkRepasse.prototype, "updated_at", void 0);
    NetworkRepasse = __decorate([
        typeorm_1.Entity()
    ], NetworkRepasse);
    return NetworkRepasse;
}(typeorm_1.BaseEntity));
exports.NetworkRepasse = NetworkRepasse;
