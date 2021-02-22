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
exports.Character = void 0;
var typeorm_1 = require("typeorm");
var Characters_1 = require("../Characters/Characters");
var Player_1 = require("../Player/Player");
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Character.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            length: 50
        }),
        __metadata("design:type", String)
    ], Character.prototype, "char_name", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (data) { return Characters_1.Characters; }, function (data) { return data.character; }),
        __metadata("design:type", Characters_1.Characters)
    ], Character.prototype, "characters", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (data) { return Player_1.Player; }, function (data) { return data.character; }),
        __metadata("design:type", Player_1.Player)
    ], Character.prototype, "player", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Character.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Character.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.RelationId(function (type) { return type.player; }),
        __metadata("design:type", Number)
    ], Character.prototype, "playerId", void 0);
    __decorate([
        typeorm_1.RelationId(function (type) { return type.characters; }),
        __metadata("design:type", Number)
    ], Character.prototype, "charactersId", void 0);
    Character = __decorate([
        typeorm_1.Entity()
    ], Character);
    return Character;
}(typeorm_1.BaseEntity));
exports.Character = Character;
