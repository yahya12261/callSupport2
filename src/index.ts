if (!process.env.ALREADY_SET) { require('dotenv').config(); }

import * as http from 'http';
import { app } from './app';
import { DatabaseService } from './app/services/databaseService';
import { Logger } from './lib/logger';
import { EndPoints } from './app/extra/EndPoints';
import { endPoint } from './routes';
// Composition root
// Function to get all defined routes

const logger: any = new Logger();
DatabaseService.createConnection();
DatabaseService.getConnection().then(() => {
  const server = http.createServer(app).listen(parseInt(process.env.PORT || '3000', 10));
  server.on('listening', async () => {

    logger.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
  });
  logger.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
})

