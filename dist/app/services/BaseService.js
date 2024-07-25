"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const apierror_1 = __importDefault(require("../global/response/apierror"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
class BaseService {
    update(model) {
        throw new Error("Method not implemented.");
    }
    getById(id) {
        throw new Error("Method not implemented.");
    }
    getRepository() {
        return (0, typeorm_1.getRepository)(this.getEntityClass());
    }
    constructor(entityConstructor) {
        this.entityConstructor = entityConstructor;
    }
    getAll(relations) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = this.getRepository();
                console.log(relations);
                const entities = yield repository.find(relations ? { relations: relations } : {});
                return entities;
            }
            catch (e) {
                console.error('Error fetching entities:', e);
                return []; // Return an empty array or handle the error differently
            }
        });
    }
    add(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            try {
                const entity = new this.entityConstructor();
                // Create an instance of the entity
                entity.fillFromModel(model);
                const saveEntity = yield repository.save(entity);
                return saveEntity;
            }
            catch (e) {
                console.error('Error adding entity:', e);
                return Promise.reject(new apierror_1.default('Already exists', errorcode_1.default.DuplicateRequest));
            }
        });
    }
}
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map