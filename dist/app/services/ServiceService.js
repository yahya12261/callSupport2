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
exports.ServiceService = void 0;
const apierror_1 = __importDefault(require("../global/response/apierror"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const Service_1 = require("../models/entities/Service");
const BaseService_1 = __importDefault(require("./BaseService"));
class ServiceService extends BaseService_1.default {
    getEntityClass() {
        return Service_1.Service;
    }
    getServiceByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield this.getRepository().findOne({
                    where: {
                        name,
                    },
                });
                if (service) {
                    return service;
                }
                else {
                    throw new apierror_1.default("service not found", errorcode_1.default.UserNotFound);
                }
            }
            catch (err) {
                console.log(err);
                throw new apierror_1.default("An error occurred", errorcode_1.default.DatabaseError);
            }
        });
    }
}
exports.ServiceService = ServiceService;
//# sourceMappingURL=ServiceService.js.map