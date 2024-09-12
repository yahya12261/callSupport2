"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonService = void 0;
const Person_1 = require("../models/entities/Person");
const BaseService_1 = __importDefault(require("./BaseService"));
class PersonService extends BaseService_1.default {
    getEntityClass() {
        return Person_1.Person;
    }
}
exports.PersonService = PersonService;
//# sourceMappingURL=personService.js.map