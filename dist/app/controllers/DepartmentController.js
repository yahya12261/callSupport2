"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DepartmentService_1 = require("../services/DepartmentService");
const BaseController_1 = require("./BaseController");
const Department_1 = require("../models/entities/Department");
const EntityType_1 = require("../enum/EntityType");
const FieldTypes_1 = require("../enum/FieldTypes");
const service = new DepartmentService_1.DepartmentService(Department_1.Department);
class DepartmentController extends BaseController_1.BaseController {
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
                alias: 'department',
                innerJoinAndSelect: {
                    createdBy: 'department.createdBy',
                    modifiedBy: 'department.modifiedBy',
                    deletedBy: 'department.deletedBy',
                },
            },
        };
        this.entity = EntityType_1.EntityType.DEPARTMENT;
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=DepartmentController.js.map