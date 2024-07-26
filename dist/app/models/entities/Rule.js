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
exports.Rule = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("./baseEntity");
const MethodTypes_1 = require("../../enum/MethodTypes");
let Rule = class Rule extends baseEntity_1.BaseEntity {
    constructor() {
        super();
    }
    fillFromModel(modal) {
        this.fillEntityFromModel(modal);
        this.name = modal.name;
        this.code = modal.code;
        this.methodName = modal.methodName;
        this.methodType = modal.methodType;
    }
};
exports.Rule = Rule;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Rule.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Rule.prototype, "route", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Rule.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Object.values(MethodTypes_1.MethodTypes),
        nullable: true
    }),
    __metadata("design:type", Object)
], Rule.prototype, "methodType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Rule.prototype, "methodName", void 0);
exports.Rule = Rule = __decorate([
    (0, typeorm_1.Entity)("rules"),
    __metadata("design:paramtypes", [])
], Rule);
//# sourceMappingURL=Rule.js.map