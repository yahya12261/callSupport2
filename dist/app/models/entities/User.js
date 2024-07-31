"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("./baseEntity");
const EntityType_1 = require("../../enum/EntityType");
const Position_1 = require("./Position");
const Rule_1 = require("./Rule");
const UserService_1 = require("../../services/UserService");
let User = class User extends baseEntity_1.BaseEntity {
    updateEntity(entity) {
        throw new Error('Method not implemented.');
    }
    afterInsertHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            const rulesCreatedSuccessfully = UserService_1.UserService.addUserRulesByPosition(this).then(b => {
                if (b) {
                    console.log('Entering afterInsertHandler3');
                    console.log(b);
                }
            });
        });
    }
    ruleBack() {
        // Add your custom logic to handle the rule creation failure
        console.log("Performing rule back operation...");
    }
    constructor() {
        super();
        this.type = EntityType_1.EntityType.USER;
    }
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    makeUsernameAndEmailLowerCase() {
        this.username = this.username.toLowerCase();
        this.email = this.email.toLowerCase();
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
    fillFromModel(model) {
        throw new Error('Method not implemented.');
    }
    addRules(rule) {
        this.rules.push(rule);
    }
    static getUserJson(user) {
        return {
            id: user.id,
            uuid: user.uuid
        };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(4, 25),
    __metadata("design:type", String)
], User.prototype, "first", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(4, 25),
    __metadata("design:type", String)
], User.prototype, "middle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(4, 25),
    __metadata("design:type", String)
], User.prototype, "last", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(4, 100),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(4, 100),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(4, 100),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(8, 8),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.Length)(4, 4),
    __metadata("design:type", Number)
], User.prototype, "OTP", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "invalidLoginAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User, (user) => user.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User, (user) => user.modifiedBy),
    __metadata("design:type", Array)
], User.prototype, "modifiedUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User, (user) => user.deletedBy),
    __metadata("design:type", Array)
], User.prototype, "deletedUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Position_1.Position, (pos) => pos.users),
    __metadata("design:type", Object)
], User.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Rule_1.Rule),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "rules", void 0);
__decorate([
    (0, typeorm_1.AfterInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "afterInsertHandler", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("users"),
    (0, typeorm_1.Unique)(['email', 'username']),
    __metadata("design:paramtypes", [])
], User);
//# sourceMappingURL=User.js.map