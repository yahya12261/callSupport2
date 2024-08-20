"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = require("../../enum/EntityType");
const FieldTypes_1 = require("../../enum/FieldTypes");
const Caza_1 = require("../../models/entities/Location/Caza");
const CazaService_1 = require("../../services/Locations/CazaService");
const BaseController_1 = require("../BaseController");
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
    }
}
exports.default = CazaController;
//# sourceMappingURL=CazaController.js.map