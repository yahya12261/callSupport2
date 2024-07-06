import EventEmitter = require('events');
import { createConnection } from 'typeorm';
import config from '../../config/config';
import { Logger } from '../../lib/logger';
import { User } from '../models/entities/User';
import { Testy } from '../models/entities/Testy';
import { Department } from '../models/entities/Department';
import { Position } from '../models/entities/Position';
import { Role } from '../models/entities/Role';

class DatabaseService {
  public static emitter: EventEmitter = new EventEmitter();
  public static isConnected = false;
  public static logger: any = new Logger();

  public static async getConnection(callback = null, wait = false) {
    DatabaseService.handleConnectionError();
    return await DatabaseService.createConnection();
  }

  public static async createConnection() {
    const dbConfig = config[`${process.env.ENV}`];
    return await createConnection({
      name: dbConfig.name,
      type: 'mysql',
      host: dbConfig.host,
      port: parseInt(dbConfig.port),
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [
        User,Department,Position,Role
      ],
      synchronize:true,
    }).then(() => {
      DatabaseService.isConnected = true;
      DatabaseService.logger.log('info', 'database connected successfully');
    }).catch((err: Error) => {
      console.log(err)
      DatabaseService.logger.log('info', 'database connection error...retrying');
      DatabaseService.emitter.emit('DB_CONNECT_ERROR');
    });
  }
  public static async handleConnectionError() {
    DatabaseService.emitter.on('DB_CONNECT_ERROR', async () => {
      DatabaseService.logger.log('info', 'database connection error...retrying');
      setTimeout(async () => {
        await DatabaseService.createConnection();
      }, 3000)
    });
  }
}

export { DatabaseService };
