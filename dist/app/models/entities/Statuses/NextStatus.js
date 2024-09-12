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
exports.NextStatus = void 0;
const typeorm_1 = require("typeorm");
const Position_1 = require("../Position");
const Status_1 = require("./Status");
const baseEntity_1 = require("../baseEntity");
const EntityType_1 = require("../../../enum/EntityType");
let NextStatus = class NextStatus extends baseEntity_1.BaseEntity {
    constructor() {
        super();
        this.type = EntityType_1.EntityType.NEXTSTATUS;
    }
    fillFromModel(modal) {
        this.fillEntityFromModel(modal);
        this.status = modal.status;
        this.positions = modal.positions;
        this.refStatus = modal.refStatus;
        // this.department = modal.department;
    }
    updateEntity(entity) {
        throw new Error('Method not implemented.');
    }
};
exports.NextStatus = NextStatus;
__decorate([
    (0, typeorm_1.ManyToOne)(() => Status_1.Status, (status) => status.nextStatuses),
    (0, typeorm_1.JoinColumn)({ name: "statusId", referencedColumnName: "id" }),
    __metadata("design:type", Status_1.Status)
], NextStatus.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Status_1.Status, (status) => status.nextStatuses),
    (0, typeorm_1.JoinColumn)({ name: "refStatusId", referencedColumnName: "id" }),
    __metadata("design:type", Status_1.Status)
], NextStatus.prototype, "refStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Position_1.Position, (position) => position.nextStatuses),
    (0, typeorm_1.JoinTable)({
        name: "position-next-status",
        joinColumn: {
            name: "nextStatusId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "positionId",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], NextStatus.prototype, "positions", void 0);
exports.NextStatus = NextStatus = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [])
], NextStatus);
//# sourceMappingURL=NextStatus.js.map