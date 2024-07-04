"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        name: "default",
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
    },
    production: {
        name: "default",
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
    },
    stage: {
        name: "default",
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
    },
    test: {
        name: "default",
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
    },
    uat: {
        name: "default",
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