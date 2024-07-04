"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const params = require('strong-params');
const body_parser_1 = require("body-parser");
const express = require('express');
const constants_1 = require("./config/constants");
const logger_1 = require("./lib/logger");
const error_handler_1 = require("./middlewares/error.handler");
const index_1 = require("./routes/index");
const app = express();
exports.app = app;
const logger = new logger_1.Logger();
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