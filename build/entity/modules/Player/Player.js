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
var ServerGame_1 = require("../ServerGame/ServerGame");
var Character_1 = require("../Character/Character");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Player.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Player.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Player.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return ServerGame_1.ServerGame; }, function (server_game) { return server_game.players; }),
        __metadata("design:type", ServerGame_1.ServerGame)
    ], Player.prototype, "servergame", void 0);
    __decorate([
        typeorm_1.OneToMany(function (data) { return Character_1.Character; }, function (data) { return data.player; }),
        __metadata("design:type", Array)
    ], Player.prototype, "character", void 0);
    __decorate([
        typeorm_1.Column({
            length: 36
        }),
        __metadata("design:type", String)
    ], Player.prototype, "user", void 0);
    __decorate([
        typeorm_1.RelationId(function (player) { return player.servergame; }),
        __metadata("design:type", Number)
    ], Player.prototype, "servergameId", void 0);
    Player = __decorate([
        typeorm_1.Entity()
    ], Player);
    return Player;
}(typeorm_1.BaseEntity));
exports.Player = Player;
