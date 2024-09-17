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
exports.Service = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("./baseEntity");
const User_1 = require("./User");
const EntityType_1 = require("../../enum/EntityType");
const StatusFlow_1 = require("./Statuses/StatusFlow");
const personOperation_1 = require("./personOperation");
let Service = class Service extends baseEntity_1.BaseEntity {
    constructor() {
        super();
        this.type = EntityType_1.EntityType.SERVICE;
    }
    fillFromModel(modal) {
        this.fillEntityFromModel(modal);
        this.name = modal.name;
    }
    updateEntity(entity) {
        throw new Error("Method not implemented.");
    }
};
exports.Service = Service;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StatusFlow_1.StatusFlow, (sf) => sf.service),
    __metadata("design:type", Array)
], Service.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => personOperation_1.PersonOperation, (sf) => sf.service),
    __metadata("design:type", Array)
], Service.prototype, "personOperation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.serviceReporters),
    (0, typeorm_1.JoinColumn)({ name: "reporterId", referencedColumnName: "id" }),
    __metadata("design:type", User_1.User)
], Service.prototype, "reporter", void 0);
exports.Service = Service = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['name']),
    __metadata("design:paramtypes", [])
], Service);
//# sourceMappingURL=Service.js.map