"use strict";
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
exports.Caza = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("../baseEntity");
const EntityType_1 = require("../../../enum/EntityType");
const Government_1 = require("./Government");
const Town_1 = require("./Town");
let Caza = class Caza extends baseEntity_1.BaseEntity {
    constructor() {
        super();
        this.type = EntityType_1.EntityType.GOVERNMENT;
    }
    fillFromModel(modal) {
        this.fillEntityFromModel(modal);
    }
    updateEntity(entity) {
        throw new Error('Method not implemented.');
    }
};
exports.Caza = Caza;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Caza.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Government_1.Government, (gov) => gov.casas),
    (0, typeorm_1.JoinColumn)({ name: 'governmentId', referencedColumnName: 'id' }),
    __metadata("design:type", Government_1.Government)
], Caza.prototype, "government", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Town_1.Town, (town) => town.caza),
    __metadata("design:type", Array)
], Caza.prototype, "towns", void 0);
exports.Caza = Caza = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['name']),
    __metadata("design:paramtypes", [])
], Caza);
//# sourceMappingURL=Caza.js.map