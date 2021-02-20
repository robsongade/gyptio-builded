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
var Character_1 = require("../Character/Character");
var TypeCharacters;
(function (TypeCharacters) {
    TypeCharacters["Archer"] = "Archer";
    TypeCharacters["Paladin"] = "Paladin";
    TypeCharacters["Lancer"] = "Lancer";
    TypeCharacters["Berserker"] = "Berserker";
})(TypeCharacters = exports.TypeCharacters || (exports.TypeCharacters = {}));
var Characters = /** @class */ (function (_super) {
    __extends(Characters, _super);
    function Characters() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Characters.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: TypeCharacters,
            default: TypeCharacters.Archer
        }),
        __metadata("design:type", String)
    ], Characters.prototype, "type", void 0);
    __decorate([
        typeorm_1.OneToMany(function (data) { return Character_1.Character; }, function (data) { return data.characters; }),
        __metadata("design:type", Array)
    ], Characters.prototype, "character", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Characters.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Characters.prototype, "updated_at", void 0);
    Characters = __decorate([
        typeorm_1.Entity()
    ], Characters);
    return Characters;
}(typeorm_1.BaseEntity));
exports.Characters = Characters;
