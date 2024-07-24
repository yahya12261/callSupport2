const params = require('strong-params');
import {json} from 'body-parser';

// const express = require('express');
import { NOT_FOUND_STATUS_CODE, NOT_FOUND_STATUS_MESSAGE } from './config/constants';
import { Logger } from './lib/logger';
import { middlewares } from './middlewares/error.handler';
import { routes as apiRoutes } from './routes/index';
import express,{ NextFunction, Request, Response, Router } from 'express';
import { EndPoints } from './middlewares/EndPoints';
const app = express();
const logger = new Logger();

app.use(json({ limit: '50mb', type: 'application/json' }));
app.use(params.expressMiddleware());
app.use(logger.getRequestLogger());

app.use('/api', apiRoutes);
app.get('/health', (req:Request, res:Response) => res.json({ status: true, message: 'Health OK!' }));

app.use(logger.getRequestErrorLogger());




app.use((req:Request, res:Response, next:NextFunction) => {
  const err = new Error(NOT_FOUND_STATUS_MESSAGE);
  res.statusCode = NOT_FOUND_STATUS_CODE;
  res.send(err.message);
});
app.use(middlewares.handleRequestError);

export { app };
