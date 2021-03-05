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
var Player_1 = require("./../Player/Player");
var ServerGameStatus;
(function (ServerGameStatus) {
    ServerGameStatus["OFF"] = "server_game_off";
    ServerGameStatus["ON"] = "server_game_on";
    ServerGameStatus["MAINTAINER_ON"] = "server_game_maintainer_on";
    ServerGameStatus["MAINTAINER_OFF"] = "server_game_maintainer_off";
})(ServerGameStatus = exports.ServerGameStatus || (exports.ServerGameStatus = {}));
var ServerGame = /** @class */ (function (_super) {
    __extends(ServerGame, _super);
    function ServerGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], ServerGame.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            length: 50
        }),
        __metadata("design:type", String)
    ], ServerGame.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ length: 255, nullable: true }),
        __metadata("design:type", String)
    ], ServerGame.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({
            unique: true
        }),
        __metadata("design:type", Number)
    ], ServerGame.prototype, "instance_id", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: ServerGameStatus,
            default: ServerGameStatus.OFF
        }),
        __metadata("design:type", String)
    ], ServerGame.prototype, "status", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], ServerGame.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], ServerGame.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.OneToMany(function (player) { return Player_1.Player; }, function (player) { return player.servergame; }),
        __metadata("design:type", Array)
    ], ServerGame.prototype, "players", void 0);
    ServerGame = __decorate([
        typeorm_1.Entity()
    ], ServerGame);
    return ServerGame;
}(typeorm_1.BaseEntity));
exports.ServerGame = ServerGame;
