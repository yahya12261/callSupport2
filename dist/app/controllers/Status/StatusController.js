"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = require("../../enum/EntityType");
const FieldTypes_1 = require("../../enum/FieldTypes");
const Status_1 = require("../../models/entities/Statuses/Status");
const StatusService_1 = require("../../services/Status/StatusService");
const BaseController_1 = require("../BaseController");
const service = new StatusService_1.StatusService(Status_1.Status);
class StatusController extends BaseController_1.BaseController {
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
                alias: 'status',
                innerJoinAndSelect: {
                    createdBy: 'status.createdBy',
                    modifiedBy: 'status.modifiedBy',
                    deletedBy: 'status.deletedBy',
                    next: 'status.next',
                    refStatus: 'next.refStatus'
                },
            },
        };
        this.entity = EntityType_1.EntityType.STATUS;
    }
}
exports.default = StatusController;
//# sourceMappingURL=StatusController.js.map