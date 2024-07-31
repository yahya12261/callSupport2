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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const params = require('strong-params');
const body_parser_1 = __importStar(require("body-parser"));
// const express = require('express');
const constants_1 = require("./config/constants");
const logger_1 = require("./lib/logger");
const error_handler_1 = require("./middlewares/error.handler");
const index_1 = require("./routes/index");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
const logger = new logger_1.Logger();
app.use(body_parser_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, body_parser_1.json)({ limit: '50mb', type: 'application/json' }));
app.use(params.expressMiddleware());
app.use(logger.getRequestLogger());
app.use('/api', index_1.routes);
app.get('/health', (req, res) => res.json({ status: true, message: 'Health OK!' }));
app.use(logger.getRequestErrorLogger());
app.use((req, res, next) => {
    const err = new Error(constants_1.NOT_FOUND_STATUS_MESSAGE);
    res.statusCode = constants_1.NOT_FOUND_STATUS_CODE;
    res.send(err.message);
});
app.use(error_handler_1.middlewares.handleRequestError);
//# sourceMappingURL=app.js.map