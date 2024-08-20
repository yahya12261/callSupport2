"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = require("../../enum/EntityType");
const FieldTypes_1 = require("../../enum/FieldTypes");
const Town_1 = require("../../models/entities/Location/Town");
const TownService_1 = require("../../services/Locations/TownService");
const BaseController_1 = require("../BaseController");
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
                name: 'caza.government.id',
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
    }
}
exports.default = TownController;
//# sourceMappingURL=TownController.js.map