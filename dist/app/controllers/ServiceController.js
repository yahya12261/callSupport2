"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = require("../enum/EntityType");
const FieldTypes_1 = require("../enum/FieldTypes");
const Service_1 = require("../models/entities/Service");
const ServiceService_1 = require("../services/ServiceService");
const BaseController_1 = require("./BaseController");
const service = new ServiceService_1.ServiceService(Service_1.Service);
class ServiceController extends BaseController_1.BaseController {
    constructor() {
        super(service, [
            {
                name: 'name',
                type: FieldTypes_1.FieldTypes.TEXT
            },
        ]);
        this.option = {
            relations: {},
            join: {
                alias: 'service',
                innerJoinAndSelect: {
                    createdBy: 'service.createdBy',
                    modifiedBy: 'service.modifiedBy',
                    deletedBy: 'service.deletedBy',
                },
            },
        };
        this.entity = EntityType_1.EntityType.SERVICE;
    }
}
exports.default = ServiceController;
//# sourceMappingURL=ServiceController.js.map