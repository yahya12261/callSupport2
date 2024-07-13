import { Request, Response, Router } from 'express';
import user from './user';
import test from './test';
import department from './department';
import position from './position';
const routes = Router();

routes.use('/v1/user', user);
routes.use('/v1/test', test);
routes.use('/v1/department', department);
routes.use('/v1/position', position);
export { routes };
