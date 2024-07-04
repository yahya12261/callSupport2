import { Request, Response, Router } from 'express';
import user from './user';
import test from './test';
const routes = Router();

routes.use('/v1/user', user);
routes.use('/v1/test', test);
export { routes };
