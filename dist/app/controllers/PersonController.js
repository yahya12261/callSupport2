"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = require("../enum/EntityType");
const FieldTypes_1 = require("../enum/FieldTypes");
const baseEntity_1 = require("../models/baseEntity");
const Person_1 = require("../models/entities/Person");
const personService_1 = require("../services/personService");
const BaseController_1 = require("./BaseController");
const service = new personService_1.PersonService(Person_1.Person);
class PersonController extends BaseController_1.BaseController {
    constructor() {
        const IPersonKeys = (0, baseEntity_1.createKeys)();
        super(service, [
            {
                name: "firstAr",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "middleAr",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "lastAr",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "firstEn",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "middleEn",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "lastEn",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "Gender",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "dob",
                type: FieldTypes_1.FieldTypes.DATE
            },
            {
                name: "fromMedical",
                type: FieldTypes_1.FieldTypes.BOOLEAN
            },
            {
                name: "nationality",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "phoneNumber",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "phoneNumberCode",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "townAddress",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "governmentAddress",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "cazaAddress",
                type: FieldTypes_1.FieldTypes.TEXT
            },
        ]);
        this.option = {
            relations: {},
            join: {
                alias: 'person',
                innerJoinAndSelect: {
                    createdBy: 'person.createdBy',
                    modifiedBy: 'person.modifiedBy',
                    deletedBy: 'person.deletedBy',
                    government: 'person.governmentAddress',
                    caza: 'person.cazaAddress'
                },
            },
        };
        this.entity = EntityType_1.EntityType.PERSON;
    }
}
exports.default = PersonController;
//# sourceMappingURL=PersonController.js.map