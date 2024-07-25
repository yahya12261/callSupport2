import BaseService from "../services/BaseService";
import { IBaseEntity } from "../models/baseEntity";
import { BaseEntity } from "../models/entities/baseEntity";
import { Request, Response } from "express";
import Template from "../global/response";
import APIError from "../global/response/apierror";
import { ServerException } from "../../lib/custom-errors";
import { EntityType } from "../models/type/EntityType";
import { TypeormOptions } from "../models/TypeormOptions";
import { User } from "../models/entities/User";
import { Position } from "../models/entities/Position";
import { CustomeRequest } from "../models/CustomeRequest";
import { EndPointsActionsEnum } from "../models/type/EndPointsActionsEnum";
      class UserSerializer {
        serialize(user: User): SerializedUser {
          return {
            id: user.id,
            name: user.first,
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            position:user.position,
          };
        }
      }
      
      interface SerializedUser {
        id: number;
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
        position:Position|null;
      }
export abstract class BaseController<T extends BaseEntity, M extends IBaseEntity, S extends BaseService<T, M>> {
  protected service: S;
abstract entity:EntityType;
abstract option:TypeormOptions;
private userSerializer: UserSerializer;

  constructor(service: S) {
    this.service = service;
    this.userSerializer = new UserSerializer();
  }

  public add = (req: CustomeRequest, res: Response, next: any) => {

    if(Object.is(req.Action,EndPointsActionsEnum.ADD))
    req.body.createdBy = User.getUserJson(req.createdUser as User);
    else if(Object.is(req.Action,EndPointsActionsEnum.UPDATE))
      req.body.modifiedBy = User.getUserJson(req.updatedUser as User);
    else if(Object.is(req.Action,EndPointsActionsEnum.DELETE))
      req.body.deletedBy = User.getUserJson(req.deletedUser as User);

        this.service
          .add(req.body)
          .then((object) => {
            if (object) {
              res.json(Template.success(object, this.entity +  " saved succesfully"));
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.ErrorID == 2110) {
              next(new APIError(err.message, err.ErrorID));
            }
            next(new ServerException("error occurred"));
          });
      };


      
    public getAll = (req: Request, res: Response, next: any) => {
        
        this.service.getAll(this.option.relations).then((data)=>{
          if(data){
            this.serializeFields(data);
            res.json(Template.success(data, ""));
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.ErrorID == 2110) {
            next(new APIError(err.message, err.ErrorID));
          }
          next(new ServerException("error occurred"));
        });
      }

      private serializeFields(data: any[]) {
        for (const item of data) {
          this.serializeField(item, 'createdBy');
          this.serializeField(item, 'modifiedBy');
          this.serializeField(item, 'deletedBy');
        }
      }
      
      private serializeField(item: any, fieldName: string) {
        if (item[fieldName]) {
          item[fieldName] = this.userSerializer.serialize(item[fieldName]);
        }
      }
}