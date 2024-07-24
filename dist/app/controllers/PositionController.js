"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("./BaseController");
const EntityType_1 = require("../models/type/EntityType");
const response_1 = __importDefault(require("../global/response"));
const apierror_1 = __importDefault(require("../global/response/apierror"));
const custom_errors_1 = require("../../lib/custom-errors");
class PositionController extends BaseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.option = {
            relations: [EntityType_1.EntityType.DEPARTMENT, "createdBy"]
        };
        this.entity = EntityType_1.EntityType.POSITION;
        this.addPostitonRule = (req, res, next) => {
            this.service
                .addPositionRule(Number(req.body.rule.id), Number(req.body.position.id))
                .then((done) => {
                if (done) {
                    res.json(response_1.default.success(null, "Rule Position added succesfully"));
                }
                else {
                    res.json(response_1.default.error(null, "Rule Position added succesfully", ""));
                }
            })
                .catch((err) => {
                console.log(err);
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new custom_errors_1.ServerException("error occurred"));
            });
        };
    }
}
exports.default = PositionController;
//# sourceMappingURL=PositionController.js.map