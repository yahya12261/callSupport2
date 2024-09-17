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
exports.PersonOperation = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("./baseEntity");
const Service_1 = require("./Service");
const Person_1 = require("./Person");
const Status_1 = require("./Statuses/Status");
const User_1 = require("./User");
const personService_1 = require("../../services/personService");
const ServiceService_1 = require("../../services/ServiceService");
const StatusService_1 = require("../../services/Status/StatusService");
const personServices = new personService_1.PersonService(Person_1.Person);
let PersonOperation = class PersonOperation extends baseEntity_1.BaseEntity {
    beforeInsert() {
        return __awaiter(this, void 0, void 0, function* () {
            // create new Person
            if (!this.person.id) {
                yield personService_1.PersonService.createPerson(this.person).then(person => {
                    if (person) {
                        this.person = person;
                        console.log("new Person Created");
                    }
                });
            }
            const statusService = new StatusService_1.StatusService(Status_1.Status);
            // set New Service
            yield statusService.getOrCreateOpenStatusByName().then(sts => {
                if (sts) {
                    this.status = sts;
                }
            });
            // if(this.createdBy){
            //     this.assignTo = this.createdBy;
            // }
            //set Reporter
            if (this.service.id) {
                const serviceService = new ServiceService_1.ServiceService(Service_1.Service);
                const fetchedService = yield serviceService.getById(this.service.id, ["reporter"]);
                if (fetchedService) {
                    console.log(fetchedService);
                    this.reporter = fetchedService.reporter;
                }
            }
        });
    }
    updateEntity(entity) {
        throw new Error("Method not implemented.");
    }
    fillFromModel(model) {
        this.fillEntityFromModel(model);
        this.service = model.service;
        this.person = model.person;
        this.status = model.status;
        this.assignTo = model.assignTo;
        this.reporter = model.reporter;
    }
};
exports.PersonOperation = PersonOperation;
__decorate([
    (0, typeorm_1.ManyToOne)(() => Service_1.Service, (service) => service.personOperation),
    (0, typeorm_1.JoinColumn)({ name: 'serviceId', referencedColumnName: 'id' }),
    __metadata("design:type", Service_1.Service)
], PersonOperation.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Person_1.Person, (person) => person.personOperation),
    (0, typeorm_1.JoinColumn)({ name: 'personId', referencedColumnName: 'id' }),
    __metadata("design:type", Person_1.Person)
], PersonOperation.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Status_1.Status, (status) => status.personOperation),
    (0, typeorm_1.JoinColumn)({ name: 'statusId', referencedColumnName: 'id' }),
    __metadata("design:type", Status_1.Status)
], PersonOperation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.assignOperation),
    (0, typeorm_1.JoinColumn)({ name: 'assignToId', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.User)
], PersonOperation.prototype, "assignTo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.reporterOperation),
    (0, typeorm_1.JoinColumn)({ name: 'reporterId', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.User)
], PersonOperation.prototype, "reporter", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PersonOperation.prototype, "beforeInsert", null);
exports.PersonOperation = PersonOperation = __decorate([
    (0, typeorm_1.Entity)()
    // @Unique(['name'])
], PersonOperation);
//# sourceMappingURL=personOperation.js.map