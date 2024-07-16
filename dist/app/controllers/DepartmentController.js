"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("./BaseController");
const EntityType_1 = require("../models/type/EntityType");
class DepartmentController extends BaseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.option = {
            relations: ["createdBy"]
        };
        this.entity = EntityType_1.EntityType.DEPARTMENT;
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=DepartmentController.js.map