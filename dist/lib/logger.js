"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const { config } = require('../config/environments/' + process.env.ENV);
const express_winston_1 = require("express-winston");
const winston_1 = require("winston");
class Logger {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            level: config.logLevel,
            format: winston_1.format.combine(winston_1.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.simple()),
        });
        if (process.env.ENV !== 'production') {
            this.logger.add(new winston_1.transports.Console({
                format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
            }));
        }
    }
    log(level, ...msg) {
        this.logger.log(level, msg);
    }
    getRequestLogger() {
        return (0, express_winston_1.logger)({
            transports: [
                new winston_1.transports.Console(),
            ],
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
            meta: process.env.ENV !== 'production', // optional: control whether you want to log the meta data about the request (default to true)
            msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
            expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
            colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            ignoreRoute(req, res) { return false; }, // optional: allows to skip some log messages based on request and/or response
        });
    }
    getRequestErrorLogger() {
        return (0, express_winston_1.errorLogger)({
            transports: [
                new winston_1.transports.Console(),
            ],
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        });
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map