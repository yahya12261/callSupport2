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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusFlow = void 0;
const typeorm_1 = require("typeorm");
const Position_1 = require("../Position");
const Status_1 = require("./Status");
const baseEntity_1 = require("../baseEntity");
const EntityType_1 = require("../../../enum/EntityType");
const Service_1 = require("../Service");
const StatusFlowService_1 = require("../../../services/Status/StatusFlowService");
let StatusFlow = class StatusFlow extends baseEntity_1.BaseEntity {
    constructor() {
        super();
        this.type = EntityType_1.EntityType.STAUTSFLOW;
    }
    fillFromModel(modal) {
        this.fillEntityFromModel(modal);
        console.log(modal.nextStatuses);
        this.refStatus = modal.refStatus;
        this.nextStatuses = modal.nextStatuses;
        this.position = modal.position;
        this.service = modal.service;
        // this.department = modal.department;
    }
    afterInsertHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextStatuses.forEach(next => {
                const flowSuccess = StatusFlowService_1.StatusFlowService.addNextStatus(next.id, this.id).then(b => {
                    console.log("flowStatus Added ");
                });
            });
        });
    }
    afterUpdateHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            const temp = this.nextStatuses;
            StatusFlowService_1.StatusFlowService.removeNextStatus(this.id).then(b => {
                console.log("removed all nextStatus ");
            });
            temp.forEach(next => {
                const flowSuccess = StatusFlowService_1.StatusFlowService.addNextStatus(next.id, this.id).then(b => {
                    console.log("flowStatus Added ");
                });
            });
        });
    }
    ruleBack() {
        // Add your custom logic to handle the rule creation failure
        console.log("Performing rule back operation...");
    }
    updateEntity(entity) {
        throw new Error('Method not implemented.');
    }
};
exports.StatusFlow = StatusFlow;
__decorate([
    (0, typeorm_1.ManyToOne)(() => Status_1.Status, (status) => status.refStatuses),
    (0, typeorm_1.JoinColumn)({ name: "refStatusId", referencedColumnName: "id" }),
    __metadata("design:type", Status_1.Status)
], StatusFlow.prototype, "refStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Status_1.Status, (status) => status.next),
    (0, typeorm_1.JoinTable)({
        name: "next_status",
        joinColumn: {
            name: "nextStatusId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "statusId",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], StatusFlow.prototype, "nextStatuses", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Position_1.Position, (position) => position.statusPosition),
    (0, typeorm_1.JoinColumn)({ name: "positionId", referencedColumnName: "id" }),
    __metadata("design:type", Position_1.Position)
], StatusFlow.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Service_1.Service, (service) => service.services),
    (0, typeorm_1.JoinColumn)({ name: "serviceId", referencedColumnName: "id" }),
    __metadata("design:type", Service_1.Service)
], StatusFlow.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.AfterInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatusFlow.prototype, "afterInsertHandler", null);
__decorate([
    (0, typeorm_1.AfterUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatusFlow.prototype, "afterUpdateHandler", null);
exports.StatusFlow = StatusFlow = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [])
], StatusFlow);
//# sourceMappingURL=StatusFlow.js.map