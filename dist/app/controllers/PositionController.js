"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("./BaseController");
const EntityType_1 = require("../models/type/EntityType");
class PositionController extends BaseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.option = {
            relations: [EntityType_1.EntityType.DEPARTMENT, "createdBy"]
        };
        this.entity = EntityType_1.EntityType.POSITION;
    }
}
exports.default = PositionController;
//# sourceMappingURL=PositionController.js.map