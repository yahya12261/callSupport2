"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = require("../../enum/EntityType");
const FieldTypes_1 = require("../../enum/FieldTypes");
const Town_1 = require("../../models/entities/Location/Town");
const TownService_1 = require("../../services/Locations/TownService");
const BaseController_1 = require("../BaseController");
const response_1 = __importDefault(require("../../global/response"));
const apierror_1 = __importDefault(require("../../global/response/apierror"));
const custom_errors_1 = require("../../../lib/custom-errors");
const service = new TownService_1.TownService(Town_1.Town);
class TownController extends BaseController_1.BaseController {
    constructor() {
        super(service, [
            {
                name: 'name',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'caza.id',
                type: FieldTypes_1.FieldTypes.NUMBER
            },
            {
                name: 'government.id',
                type: FieldTypes_1.FieldTypes.NUMBER
            },
        ]);
        this.option = {
            relations: {},
            join: {
                alias: 'town',
                innerJoinAndSelect: {
                    createdBy: 'town.createdBy',
                    modifiedBy: 'town.modifiedBy',
                    deletedBy: 'town.deletedBy',
                    caza: 'town.caza',
                    government: 'caza.government'
                },
            },
        };
        this.entity = EntityType_1.EntityType.TOWN;
        this.getSelectOptionByCazaId = (req, res, next) => {
            const cazaId = req.params.cazaId;
            this.service.getSelectOptionByCazaId(Number(cazaId)).then((result) => {
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
exports.default = TownController;
//# sourceMappingURL=TownController.js.map