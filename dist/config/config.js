"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
    },
    production: {
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
    },
    stage: {
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
    },
    test: {
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
    },
    uat: {
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map