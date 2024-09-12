"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = require("../../enum/EntityType");
const FieldTypes_1 = require("../../enum/FieldTypes");
const Caza_1 = require("../../models/entities/Location/Caza");
const CazaService_1 = require("../../services/Locations/CazaService");
const BaseController_1 = require("../BaseController");
const apierror_1 = __importDefault(require("../../global/response/apierror"));
const custom_errors_1 = require("../../../lib/custom-errors");
const response_1 = __importDefault(require("../../global/response"));
const service = new CazaService_1.CazaService(Caza_1.Caza);
class CazaController extends BaseController_1.BaseController {
    constructor() {
        super(service, [
            {
                name: 'name',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'government.id',
                type: FieldTypes_1.FieldTypes.NUMBER
            },
        ]);
        this.option = {
            relations: {},
            join: {
                alias: 'caza',
                innerJoinAndSelect: {
                    createdBy: 'caza.createdBy',
                    modifiedBy: 'caza.modifiedBy',
                    deletedBy: 'caza.deletedBy',
                    government: 'caza.government'
                },
            },
        };
        this.entity = EntityType_1.EntityType.CAZA;
        this.getSelectOptionByGovernmentId = (req, res, next) => {
            const governemntId = req.params.govId;
            this.service.getSelectOptionByGovernmentId(Number(governemntId)).then((result) => {
                if (result) {
                    res.json(response_1.default.success(result, ""));
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
exports.default = CazaController;
//# sourceMappingURL=CazaController.js.map