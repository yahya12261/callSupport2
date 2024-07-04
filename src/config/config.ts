import {IDatabase} from './interface';
const config : { [key: string]: IDatabase }  = {
  development: {
    name:"default",
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
  },
  production: {
    name:"default",
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
  },
  stage: {
    name:"default",
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
  },
  test: {
    name:"default",
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
  },
  uat: {
    name:"default",
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
  },
};
export default config;
