import express, { NextFunction, Request, Response, Router } from 'express';
import user from './user';
import test from './test';
import department from './department';
import position from './position';
import Rule from './Rule'
import government from './Locations/government';
import caza from './Locations/caza';
import town from './Locations/town';
import status from './Status/Status';
import statusFlow from './Status/StatusFlow';
import service from './Service';
import { EndPoints } from '../app/extra/EndPoints';
import person from './Person';
import personOperation from './personOperation'
const routes = Router();
const routers: Map<string, express.Router> =new Map();
routers.set('/v1/user',user);
routers.set('/v1/test',test);
routers.set('/v1/department',department);
routers.set('/v1/position',position);
routers.set('/v1/rule',Rule);
routers.set('/v1/government',government);
routers.set('/v1/caza',caza);
routers.set('/v1/town',town);
routers.set('/v1/status',status);
routes.use('/v1/status-flow', statusFlow);
routes.use('/v1/service', service);
routes.use('/v1/person',person);
routes.use('/v1/person-operation',personOperation);
const endPoint :EndPoints = new EndPoints(routers);
// console.log(endPoint.getAllRoutes())
routes.use('/v1/user', user);
routes.use('/v1/test', test);
routes.use('/v1/department', department);
routes.use('/v1/position', position);
routes.use('/v1/rule', Rule);
routes.use('/v1/government', government);
routes.use('/v1/caza', caza);
routes.use('/v1/town', town);
routes.use('/v1/status', status);
routes.use('/v1/service',service);
routes.use('/v1/status-flow', statusFlow);
routes.use('/v1/person', person);
routes.use('/v1/person-operation',personOperation);

export { routes,endPoint };
