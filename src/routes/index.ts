import express, { NextFunction, Request, Response, Router } from 'express';
import user from './user';
import test from './test';
import department from './department';
import position from './position';
import Rule from './Rule'
import { EndPoints } from '../middlewares/EndPoints';

const routes = Router();
const routers: Map<string, express.Router> =new Map();
routers.set('/v1/user',user);
routers.set('/v1/test',test);
routers.set('/v1/department',department);
routers.set('/v1/position',position);
routers.set('/v1/rule',Rule);
const endPoint :EndPoints = new EndPoints(routers);
// console.log(endPoint.getAllRoutes())
routes.use('/v1/user', user);
routes.use('/v1/test', test);
routes.use('/v1/department', department);
routes.use('/v1/position', position);
routes.use('/v1/rule', Rule);


export { routes,endPoint };
