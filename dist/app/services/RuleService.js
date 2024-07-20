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
exports.RuleService = void 0;
const typeorm_1 = require("typeorm");
const Rule_1 = require("../models/entities/Rule");
const BaseService_1 = __importDefault(require("./BaseService"));
const Position_1 = require("../models/entities/Position");
const apierror_1 = __importDefault(require("../global/response/apierror"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const User_1 = require("../models/entities/User");
class RuleService extends BaseService_1.default {
    getEntityClass() {
        return Rule_1.Rule;
    }
    addPositionRule(ruleId, positionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the existing Position and Rule entities
                const repository = this.getRepository();
                const positionRepository = (0, typeorm_1.getRepository)(Position_1.Position);
                const position = yield positionRepository.findOne({ id: positionId });
                const rule = yield repository.findOne({ id: ruleId });
                // Add the new association
                if (position && rule) {
                    position.rules = [rule];
                    rule.positions = [position];
                    // Save the updated entities
                    yield positionRepository.save(position);
                    yield repository.save(rule);
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (err) {
                console.error('Error adding position-rule association:', err);
                return Promise.reject(new apierror_1.default('Error adding position-rule association', errorcode_1.default.InternalServerError));
            }
        });
    }
    addSpecificUserRule(ruleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the existing Position and Rule entities
                const repository = this.getRepository();
                const UserRepository = (0, typeorm_1.getRepository)(User_1.User);
                const user = yield UserRepository.findOne({ id: userId });
                const rule = yield repository.findOne({ id: ruleId });
                // Add the new association
                if (user && rule) {
                    user.rules = [rule];
                    rule.users = [user];
                    // Save the updated entities
                    yield UserRepository.save(user);
                    yield repository.save(rule);
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (err) {
                console.error('Error adding position-rule association:', err);
                return Promise.reject(new apierror_1.default('Error adding position-rule association', errorcode_1.default.InternalServerError));
            }
        });
    }
    // async addUserRules(
    //   user:User
    // ): Promise<boolean | null> {
    //   const position = user.position;
    //   try {
    //     // Get the existing User, Position, and Rule entities
    //     const userRepository = getRepository(User);
    //     const positionRepository = getRepository(Position);
    //     const repository = this.getRepository();
    //     if(userId&&userId>0){
    //     const position = await positionRepository.findOne({ where: { id:user?.id  }, relations: ['rules'] });
    //     console.log("position",position);
    //     if (!position) {
    //       return false;
    //     }
    //     // Get all rules associated with the user's position
    //     const positionRules = await repository.find({ where: { positions: { id: position.id } } });
    //     const user = 
    //     // Filter out the rules that the user is already associated with
    //     const availableRules = positionRules.filter(rule => !user.rules.some(r => r.id === rule.id));
    //     console.log("availableRules  : ",availableRules)
    //     // Add the association between the user and the available rules
    //     user.rules.push(...availableRules);
    //     availableRules.forEach(rule => rule.users.push(user));
    //     // Save the updated entities
    //     await userRepository.save(user);
    //     await repository.save(availableRules);
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }
    //   } catch (err) {
    //     console.error('Error adding user-rule association:', err);
    //     return Promise.reject(new APIError('Error adding user-rule association', Err.InternalServerError));
    //   }
    // }
    addUserRulesByPosition(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const positionRepository = (0, typeorm_1.getRepository)(Position_1.Position);
            const ruleRepository = (0, typeorm_1.getRepository)(Rule_1.Rule);
            try {
                const position = yield positionRepository.findOne({
                    where: { id: (_a = user.position) === null || _a === void 0 ? void 0 : _a.id },
                    relations: ['rules'],
                });
                console.log('position', position);
                if (!position || !position.rules) {
                    return null;
                }
                // Ensure user.rules is an array before using push()
                if (!Array.isArray(user.rules)) {
                    user.rules = [];
                }
                const availableRules = position.rules.filter((rule) => !user.rules.some((r) => r.id === rule.id));
                // availableRules.forEach(rule)
                console.log("availableRules", availableRules);
                availableRules.forEach((rule) => user.addRules(rule));
                const saved = yield userRepository.save(user);
                return saved ? true : false;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    deleteUserRules(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepository = (0, typeorm_1.getRepository)(User_1.User);
                const ruleRepository = this.getRepository();
                // Fetch the user entity with its associated rules
                const user = yield userRepository.findOne({ where: { id: userId }, relations: ['rules'] });
                if (!user) {
                    return false;
                }
                // Remove the association between the user and all its rules
                user.rules = [];
                yield userRepository.save(user);
                // Update the rules to remove the association with the user
                const rules = yield ruleRepository.find({ where: { users: { id: user.id } } });
                rules.forEach(rule => {
                    rule.users = rule.users.filter(u => u.id !== user.id);
                });
                yield ruleRepository.save(rules);
                return true;
            }
            catch (err) {
                console.error('Error deleting user-rule associations:', err);
                return Promise.reject(new apierror_1.default('Error deleting user-rule associations', errorcode_1.default.InternalServerError));
            }
        });
    }
}
exports.RuleService = RuleService;
//# sourceMappingURL=RuleService.js.map