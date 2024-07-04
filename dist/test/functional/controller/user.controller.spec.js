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
Object.defineProperty(exports, "__esModule", { value: true });
require("../../helpers/intialise-env-vars");
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const app_1 = require("../../../app");
const databaseService_1 = require("../../../app/services/databaseService");
const typeorm_1 = require("typeorm");
const chai = require("chai");
const chaiHttp = require("chai-http");
const nock = require('nock');
const uuid = require('uuid');
chai.use(chaiHttp);
describe('User Controller', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, typeorm_1.getConnection)();
        }
        catch (error) {
            yield databaseService_1.DatabaseService.getConnection();
        }
        return true;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, typeorm_1.getConnection)().synchronize(true);
        return true;
    }));
    describe('Create', () => {
        (0, mocha_1.it)('should  create User with valid request body', () => __awaiter(void 0, void 0, void 0, function* () {
            const params = {
                username: "test",
                password: "test",
                email: "test@gmail.com",
                role: "admin"
            };
            let response = yield chai.request(app_1.app).post('/api/v1/user').type('application/json').send(params);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body.success).to.equal(true);
        }));
        (0, mocha_1.it)('should not create User with valid duplicate email in request body', () => __awaiter(void 0, void 0, void 0, function* () {
            const params = {
                username: "test",
                password: "test",
                email: "test@gmail.com",
                role: "admin"
            };
            let response = yield chai.request(app_1.app).post('/api/v1/user').type('application/json').send(params);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body.success).to.equal(true);
            let response1 = yield chai.request(app_1.app).post('/api/v1/user').type('application/json').send(params);
            (0, chai_1.expect)(response1.status).to.equal(400);
            (0, chai_1.expect)(response1.body.success).to.equal(false);
            (0, chai_1.expect)(response1.body.message).to.equal('User Already exists');
        }));
        (0, mocha_1.it)('should get all users ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai.request(app_1.app).get('/api/v1/user').type('application/json').send();
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body.data).to.deep.equal([]);
        }));
        (0, mocha_1.it)('should  create User with valid data and get using apis', () => __awaiter(void 0, void 0, void 0, function* () {
            const params = {
                username: "test",
                password: "test",
                email: "test@gmail.com",
                role: "admin"
            };
            let response = yield chai.request(app_1.app).post('/api/v1/user').type('application/json').send(params);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body.success).to.deep.equal(true);
            let response1 = yield chai.request(app_1.app).get('/api/v1/user').type('application/json').send();
            (0, chai_1.expect)(response1.status).to.equal(200);
            (0, chai_1.expect)(response1.body.success).to.equal(true);
            (0, chai_1.expect)(response1.body.data.length).to.equal(1);
        }));
    });
});
//# sourceMappingURL=user.controller.spec.js.map