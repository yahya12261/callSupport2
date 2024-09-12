import EventEmitter = require('events');
import { createConnection } from 'typeorm';
import config from '../../config/config';
import { Logger } from '../../lib/logger';
import axios, { AxiosResponse } from 'axios';
import { endPoint } from '../../routes';
import { User } from '../models/entities/User';
import { Department } from '../models/entities/Department';
import { Position } from '../models/entities/Position';
import { Rule } from '../models/entities/Rule';
import { Government } from '../models/entities/Location/Government';
import { Caza } from '../models/entities/Location/Caza';
import { Town } from '../models/entities/Location/Town';
import { Status } from '../models/entities/Statuses/Status';
import {StatusFlow} from '../models/entities/Statuses/StatusFlow';
import { Service } from '../models/entities/Service';
import { Person } from '../models/entities/Person';
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
        User,Department,Position,Rule,Government,Caza,Town,Status,StatusFlow,Service,Person
      ],
      logging:true,
      synchronize:true,
    }).then(() => {
      DatabaseService.isConnected = true;
      DatabaseService.logger.log('info', 'database connected successfully');
      endPoint.getAllRoutes();
    }).catch((err: Error) => {
      // console.log(err)
      // DatabaseService.logger.log('info', 'database connection error...retrying');
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
  // public static syncRules(route:string){
  //   axios.get(`http://localhost:3000/api/v1/${route}/sync`)
  //       .then((response: AxiosResponse) => {
  //         console.log('rules sync successfully!');
  //       })
  //       .catch((error) => {
  //         DatabaseService.logger.log('info', 'sync error');
  //       });
  // }
}


export { DatabaseService };
