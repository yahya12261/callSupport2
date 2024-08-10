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
exports.Position = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("./baseEntity");
const Department_1 = require("./Department");
const User_1 = require("./User");
const EntityType_1 = require("../../enum/EntityType");
const Rule_1 = require("./Rule");
let Position = class Position extends baseEntity_1.BaseEntity {
    updateEntity(entity) {
        throw new Error('Method not implemented.');
    }
    constructor() {
        super();
        this.type = EntityType_1.EntityType.POSITION;
    }
    fillFromModel(modal) {
        this.fillEntityFromModel(modal);
        this.name = modal.name;
        this.department = modal.department;
    }
    addRules(rule) {
        this.rules.push(rule);
    }
};
exports.Position = Position;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Position.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Department_1.Department, (department) => department.positions),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId', referencedColumnName: 'id' }),
    __metadata("design:type", Department_1.Department)
], Position.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User_1.User, (user) => user.position),
    __metadata("design:type", Array)
], Position.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Rule_1.Rule, (rule) => rule.positionRules),
    (0, typeorm_1.JoinTable)({
        name: 'position_rule',
        joinColumn: {
            name: 'positionId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'ruleId',
            referencedColumnName: 'id'
        }
    }),
    __metadata("design:type", Array)
], Position.prototype, "rules", void 0);
exports.Position = Position = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['name']),
    __metadata("design:paramtypes", [])
], Position);
//# sourceMappingURL=Position.js.map