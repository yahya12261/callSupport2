"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = require("../../enum/EntityType");
const FieldTypes_1 = require("../../enum/FieldTypes");
const Government_1 = require("../../models/entities/Location/Government");
const GovernmentService_1 = require("../../services/Locations/GovernmentService");
const BaseController_1 = require("../BaseController");
const service = new GovernmentService_1.GovernmentService(Government_1.Government);
class GovernmentController extends BaseController_1.BaseController {
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
                alias: 'government',
                innerJoinAndSelect: {
                    createdBy: 'government.createdBy',
                    modifiedBy: 'government.modifiedBy',
                    deletedBy: 'government.deletedBy',
                },
            },
        };
        this.entity = EntityType_1.EntityType.GOVERNMENT;
    }
}
exports.default = GovernmentController;
//# sourceMappingURL=GovernmentController.js.map