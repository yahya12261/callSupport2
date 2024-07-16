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
exports.Department = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("./baseEntity");
const Position_1 = require("./Position");
const EntityType_1 = require("../type/EntityType");
let Department = class Department extends baseEntity_1.BaseEntity {
    constructor() {
        super();
        this.type = EntityType_1.EntityType.DEPARTMENT;
    }
    fillFromModel(modal) {
        this.fillEntityFromModel(modal);
        this.name = modal.name;
    }
};
exports.Department = Department;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Department.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Position_1.Position, (pos) => pos.department),
    __metadata("design:type", Array)
], Department.prototype, "positions", void 0);
exports.Department = Department = __decorate([
    (0, typeorm_1.Entity)("departments"),
    (0, typeorm_1.Unique)(['name']),
    __metadata("design:paramtypes", [])
], Department);
//# sourceMappingURL=Department.js.map