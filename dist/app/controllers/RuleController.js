"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("./BaseController");
const EntityType_1 = require("../enum/EntityType");
// const service = new RuleService(Rule);
// const ruleService = new RuleService(Rule);
class RuleController extends BaseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.option = {
            relations: ["createdBy"],
        };
        this.entity = EntityType_1.EntityType.API;
        this.addEndPointsRule = (endPoint) => {
            this.service.addRule(endPoint).then(() => {
            }).catch(err => {
                console.log(err);
            });
        };
    }
}
exports.default = RuleController;
//# sourceMappingURL=RuleController.js.map