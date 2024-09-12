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
                name: IPersonKeys.firstAr,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.firstAr,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.middleAr,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.lastAr,
                type: FieldTypes_1.FieldTypes.TEXT
            }, {
                name: IPersonKeys.firstEn,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.middleEn,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.lastEn,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.Gender,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.dob,
                type: FieldTypes_1.FieldTypes.DATE
            },
            {
                name: IPersonKeys.fromMedical,
                type: FieldTypes_1.FieldTypes.BOOLEAN
            }, {
                name: IPersonKeys.nationality,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.phoneNumber,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.phoneNumberCode,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.townAddress,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.governmentAddress,
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: IPersonKeys.cazaAddress,
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
                },
            },
        };
        this.entity = EntityType_1.EntityType.PERSON;
    }
}
exports.default = PersonController;
//# sourceMappingURL=PersonController.js.map