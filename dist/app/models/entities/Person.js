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
exports.Person = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("./baseEntity");
const class_validator_1 = require("class-validator");
const Gender_1 = require("../../enum/Gender");
const Nationality_1 = require("../../enum/Nationality");
const Government_1 = require("./Location/Government");
const Caza_1 = require("./Location/Caza");
let Person = class Person extends baseEntity_1.BaseEntity {
    updateEntity(entity) {
        throw new Error("Method not implemented.");
    }
    fillFromModel(model) {
        this.fillEntityFromModel(model);
        this.firstAr = model.firstAr;
        this.middleAr = model.middleAr;
        this.lastAr = model.lastAr;
        this.firstEn = model.firstEn;
        this.middleEn = model.middleEn;
        this.lastEn = model.lastEn;
        this.dob = model.dob;
        this.Gender = model.Gender;
        this.LID = model.LID;
        this.nationality = model.nationality;
        this.governmentAddress = model.governmentAddress;
        this.cazaAddress = model.cazaAddress;
        this.townAddress = model.townAddress;
        this.phoneNumber = model.phoneNumber;
        this.phoneNumberCode = model.phoneNumberCode;
        this.fromMedical = model.fromMedical;
        this.haveInsurance = model.haveInsurance;
        this.insuranceName = model.insuranceName;
    }
};
exports.Person = Person;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(2, 25),
    __metadata("design:type", String)
], Person.prototype, "firstAr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(2, 25),
    __metadata("design:type", String)
], Person.prototype, "middleAr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(2, 25),
    __metadata("design:type", String)
], Person.prototype, "lastAr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(2, 25),
    __metadata("design:type", String)
], Person.prototype, "firstEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(2, 25),
    __metadata("design:type", String)
], Person.prototype, "middleEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(2, 25),
    __metadata("design:type", String)
], Person.prototype, "lastEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(2, 25),
    __metadata("design:type", Date)
], Person.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, class_validator_1.Length)(1, 25),
    __metadata("design:type", String)
], Person.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: "+961" }),
    (0, class_validator_1.Length)(1, 4),
    __metadata("design:type", String)
], Person.prototype, "phoneNumberCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Object.values(Gender_1.Gender),
        nullable: true
    }),
    __metadata("design:type", String)
], Person.prototype, "Gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(2, 25),
    __metadata("design:type", String)
], Person.prototype, "LID", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Object.values(Nationality_1.Nationality),
        nullable: true,
        default: Nationality_1.Nationality.Lebanese
    }),
    __metadata("design:type", String)
], Person.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Government_1.Government, (gov) => gov.personGovernment),
    (0, typeorm_1.JoinColumn)({ name: 'governmentId', referencedColumnName: 'id' }),
    __metadata("design:type", Government_1.Government)
], Person.prototype, "governmentAddress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Caza_1.Caza, (caza) => caza.personCaza),
    (0, typeorm_1.JoinColumn)({ name: 'CazaId', referencedColumnName: 'id' }),
    __metadata("design:type", Caza_1.Caza)
], Person.prototype, "cazaAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Person.prototype, "townAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Person.prototype, "fromMedical", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Person.prototype, "haveInsurance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", String)
], Person.prototype, "insuranceName", void 0);
exports.Person = Person = __decorate([
    (0, typeorm_1.Entity)()
    // @Unique(['name'])
], Person);
//# sourceMappingURL=Person.js.map