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
exports.BaseEntity = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const User_1 = require("./User");
const EntityType_1 = require("../../enum/EntityType");
let BaseEntity = class BaseEntity {
    constructor() {
        this.uuid = (0, uuid_1.v4)();
    }
    fillEntityFromModel(modal, isUpdate) {
        this.arabicLabel = modal.arabicLabel;
        this.isActive = modal.isActive;
        this.dsc = modal.dsc;
        this.note = modal.note;
        if (!isUpdate) {
            this.createdBy = modal.createdBy;
        }
        this.modifiedBy = modal.modifiedBy;
        this.deletedBy = modal.deletedBy;
    }
    updateBaseEntity(Base) {
        this.arabicLabel = Base.arabicLabel;
        this.dsc = Base.dsc;
        this.isActive = Base.isActive;
        this.note = Base.note;
    }
};
exports.BaseEntity = BaseEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int', generated: 'increment' }),
    __metadata("design:type", Number)
], BaseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid', generated: 'uuid' }),
    __metadata("design:type", String)
], BaseEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "dsc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "arabicLabel", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Object.values(EntityType_1.EntityType),
    }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: true }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.createdBy),
    __metadata("design:type", Object)
], BaseEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.modifiedBy),
    __metadata("design:type", Object)
], BaseEntity.prototype, "modifiedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.deletedBy),
    __metadata("design:type", Object)
], BaseEntity.prototype, "deletedBy", void 0);
exports.BaseEntity = BaseEntity = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [])
], BaseEntity);
//# sourceMappingURL=baseEntity.js.map