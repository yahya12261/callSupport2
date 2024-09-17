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
exports.PersonOperationService = void 0;
const typeorm_1 = require("typeorm");
const personOperation_1 = require("../models/entities/personOperation");
const User_1 = require("../models/entities/User");
const BaseService_1 = __importDefault(require("./BaseService"));
const apierror_1 = __importDefault(require("../global/response/apierror"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const StatusFlow_1 = require("../models/entities/Statuses/StatusFlow");
class PersonOperationService extends BaseService_1.default {
    getEntityClass() {
        return personOperation_1.PersonOperation;
    }
    changeAssign(OperationId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const repository = this.getRepository();
            try {
                const operation = yield repository.findOne(OperationId);
                const user = yield userRepository.findOne(userId);
                if (!operation || !user) {
                    return Promise.reject(new apierror_1.default("خطأ في الطلب", errorcode_1.default.UndefinedCode));
                }
                if (operation.assignTo.id === user.id) {
                    return Promise.reject(new apierror_1.default("هو متابع هذه الحالة بالفعل", errorcode_1.default.UndefinedCode));
                }
                operation.assignTo = user;
                yield repository.save(operation);
            }
            catch (err) {
                return Promise.reject(new apierror_1.default("خطأ" + err, errorcode_1.default.UndefinedCode));
            }
        });
    }
    changeStatus(operation, position, statusId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const flowRepository = (0, typeorm_1.getRepository)(StatusFlow_1.StatusFlow);
            try {
                if (operation && statusId) {
                    // Fetch the flow along with its next statuses
                    const flow = yield flowRepository.createQueryBuilder('flow')
                        .leftJoinAndSelect('flow.service', 'service')
                        .leftJoinAndSelect('flow.refStatus', 'refStatus')
                        .leftJoinAndSelect('flow.position', 'position')
                        .leftJoinAndSelect('flow.nextStatuses', 'nextStatuses') // Join next statuses
                        .where('service.id = :serviceId', { serviceId: operation.service.id })
                        .andWhere('refStatus.id = :refStatusId', { refStatusId: operation.status.id })
                        .andWhere('position.id = :positionId', { positionId: position.id })
                        .getOne();
                    // Check if flow exists
                    if (!flow) {
                        return Promise.reject(new apierror_1.default("ليس لديك صلاحية", errorcode_1.default.UndefinedCode));
                    }
                    console.log(flow.nextStatuses);
                    console.log(`Checking next status with nextStatusId: ${flow.id} and statusId: ${statusId}`);
                    // Check if the next status exists in the flow's next statuses
                    const nextStatusExists = flow.nextStatuses.some(nextStatus => nextStatus.id === Number(statusId));
                    if (!nextStatusExists) {
                        return Promise.reject(new apierror_1.default("ليس لديك صلاحية", errorcode_1.default.UndefinedCode));
                    }
                    // Update the operation's status
                    operation.status.id = statusId;
                    yield repository.save(operation);
                }
            }
            catch (err) {
                console.error("Error fetching next status:", err); // Enhanced logging
                return Promise.reject(new apierror_1.default("خطأ: ", errorcode_1.default.UndefinedCode));
            }
        });
    }
}
exports.PersonOperationService = PersonOperationService;
//# sourceMappingURL=personOperationService.js.map