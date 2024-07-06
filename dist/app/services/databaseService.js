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
exports.DatabaseService = void 0;
const EventEmitter = require("events");
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../../config/config"));
const logger_1 = require("../../lib/logger");
const User_1 = require("../models/entities/User");
const Department_1 = require("../models/entities/Department");
const Position_1 = require("../models/entities/Position");
const Role_1 = require("../models/entities/Role");
class DatabaseService {
    static getConnection() {
        return __awaiter(this, arguments, void 0, function* (callback = null, wait = false) {
            DatabaseService.handleConnectionError();
            return yield DatabaseService.createConnection();
        });
    }
    static createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConfig = config_1.default[`${process.env.ENV}`];
            return yield (0, typeorm_1.createConnection)({
                name: dbConfig.name,
                type: 'mysql',
                host: dbConfig.host,
                port: parseInt(dbConfig.port),
                username: dbConfig.username,
                password: dbConfig.password,
                database: dbConfig.database,
                entities: [
                    User_1.User, Department_1.Department, Position_1.Position, Role_1.Role
                ],
                synchronize: true,
            }).then(() => {
                DatabaseService.isConnected = true;
                DatabaseService.logger.log('info', 'database connected successfully');
            }).catch((err) => {
                console.log(err);
                DatabaseService.logger.log('info', 'database connection error...retrying');
                DatabaseService.emitter.emit('DB_CONNECT_ERROR');
            });
        });
    }
    static handleConnectionError() {
        return __awaiter(this, void 0, void 0, function* () {
            DatabaseService.emitter.on('DB_CONNECT_ERROR', () => __awaiter(this, void 0, void 0, function* () {
                DatabaseService.logger.log('info', 'database connection error...retrying');
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield DatabaseService.createConnection();
                }), 3000);
            }));
        });
    }
}
exports.DatabaseService = DatabaseService;
DatabaseService.emitter = new EventEmitter();
DatabaseService.isConnected = false;
DatabaseService.logger = new logger_1.Logger();
//# sourceMappingURL=databaseService.js.map