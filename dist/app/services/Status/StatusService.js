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
exports.StatusService = void 0;
const apierror_1 = __importDefault(require("../../global/response/apierror"));
const errorcode_1 = __importDefault(require("../../global/response/errorcode"));
const Status_1 = require("../../models/entities/Statuses/Status");
const BaseService_1 = __importDefault(require("../BaseService"));
class StatusService extends BaseService_1.default {
    getEntityClass() {
        return Status_1.Status;
    }
    getOrCreateOpenStatusByName() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = yield this.getRepository().findOne({
                    where: { name: "NEW" },
                });
                if (status) {
                    return status;
                }
                else {
                    const newStatusObject = new Status_1.Status();
                    newStatusObject.name = "NEW";
                    newStatusObject.arabicLabel = "جديد";
                    const newService = yield this.getRepository().save(newStatusObject);
                    return newService;
                }
            }
            catch (err) {
                console.log(err);
                return Promise.reject(new apierror_1.default("Failed to get Or Create New Service " + err, errorcode_1.default.UndefinedCode));
            }
        });
    }
}
exports.StatusService = StatusService;
//# sourceMappingURL=StatusService.js.map