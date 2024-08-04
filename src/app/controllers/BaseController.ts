import BaseService from "../services/BaseService";
import { IBaseEntity } from "../models/baseEntity";
import { BaseEntity } from "../models/entities/baseEntity";
import { Request, Response } from "express";
import Template from "../global/response";
import APIError from "../global/response/apierror";
import { ServerException } from "../../lib/custom-errors";
import { EntityType } from "../enum/EntityType";
import { TypeormOptions } from "../interface/TypeormOptions";
import { User } from "../models/entities/User";
import { Position } from "../models/entities/Position";
import { CustomeRequest } from "../interface/CustomeRequest";
import { EndPointsActionsEnum } from "../enum/EndPointsActionsEnum";
import { RequestElement } from "../interface/RequestElement";
import { ResponseElement } from "../interface/ResponseElement";
import { validateOrderOperation } from "../enum/OrderByOperation";
import { SearchFields } from "../interface/SearchFields";
import { FieldTypes } from "../enum/FieldTypes";
import { getQueryOperatorFromString, QueryOperator } from "../enum/WhereOperations";
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
    protected reqElm :RequestElement = {} as RequestElement ;
    protected childSearchableFields:SearchFields[]={} as SearchFields[] ;
    constructor(service: S,searchFields?:SearchFields[]) {
    this.service = service;
    this.userSerializer = new UserSerializer();
    if(searchFields){
    this.searchFields = this.searchFields.concat(searchFields);
    this.childSearchableFields = searchFields}
  }
  public searchFields:SearchFields[]=this.getDefaultSearchableFields();



  public update = (req: CustomeRequest, res: Response, next: any) =>{
    req.body.modifiedBy = User.getUserJson(req.updatedUser as User);
    this.service
    .update(req.body)
    .then((object) => {
      if (object) {
        res.json(Template.success(object, this.entity +  " تم التعديل"));
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

  public add = (req: CustomeRequest, res: Response, next: any) => {
    console.log(req.body)
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

//getSelectOption

      public getSelectOption = (req: Request, res: Response, next: any)=>{
        this.service.getSelectOption().then((result)=>{
          if(result){
            res.json(Template.success(result, ""));
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
      public getScheme = (req: Request, res: Response, next: any) => {
        res.json(Template.success(this.getDefaultSearchableFields(), ""));
      }
    public getAll = (req: Request, res: Response, next: any) => {
      this.reqElm.page = Number(req.query.page);
      this.reqElm.pageSize = Number(req.query.pageSize);
      this.reqElm.orderBy = req.query.orderBy?String(req.query.orderBy):"createdAt";
      this.reqElm.order = req.query.order?validateOrderOperation(String(req.query.order)):"DESC";
      this.reqElm.relations = this.option.relations;
      this.fillSearchableFieldFromRequest(req)
      this.reqElm.search = this.searchFields;
        this.service.getAll(this.reqElm).then(({result})=>{
          if(result){
            this.serializeFields(result.data);
           this.searchFields = this.getDefaultSearchableFields();
            res.json(Template.success(result, ""));
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

      protected serializeFields(data: any[]) {
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
      protected fillSearchableFieldFromRequest(req: Request): void {
        console.log( this.searchFields)
        this.searchFields=this.getDefaultSearchableFields();
        this.searchFields.forEach((field) => {
          const fieldName = field.name;
          const operationName = `${fieldName}OP`;
      
          // Check if the field exists in the request query
          if (req.query[fieldName] !== undefined) {
            // Ensure the value is a string
            if (Array.isArray(req.query[fieldName])) {
              field.value = req.query[fieldName][0] as string;
              
            } else {
              field.value = req.query[fieldName] as string;
            }
            field.value = this.valueToType(field.value,field.type);
          }
      
          // Check if the operation exists in the request query
          if (req.query[operationName] !== undefined) {
            field.operation = getQueryOperatorFromString(req.query[operationName] as string) ;
          }
          if(field.value&&field.type === FieldTypes.DATE&&field.operation=== QueryOperator.EQUAL){
            field.operation = QueryOperator.BETWEEN;
            field.value =this.updateFieldValue(field.value);
          }

        });

    
        // Remove fields that don't have a value
        this.searchFields = this.searchFields.filter((field) => field.value !== undefined||field.value !== "undefined,Invalid Date");
        console.log( this.searchFields)
      }
      private valueToType(value:string,type:FieldTypes):any{
        if(Object.is(type,FieldTypes.TEXT))
          return value+"";
        else if(Object.is(type,FieldTypes.NUMBER))
         return Number(value);
        else if(Object.is(type,FieldTypes.DATE))
          return value+"";
        else if(Object.is(type,FieldTypes.BOOLEAN))
          return Boolean(value);
      }

      protected getDefaultSearchableFields(): SearchFields[] {
        const defaultFields = [
          {
            name: "id",
            type: FieldTypes.NUMBER,
          },
          {
            name: "uuid",
            type: FieldTypes.TEXT,
          },
          {
            name: "createdAt",
            type: FieldTypes.DATE,
          },
          {
            name: "updatedAt",
            type: FieldTypes.DATE,
          },
          {
            name: "deletedAt",
            type: FieldTypes.DATE,
          },
          {
            name: "arabicLabel",
            type: FieldTypes.TEXT,
          },
          {
            name: "type",
            type: FieldTypes.TEXT,
          },
          {
            name: "isActive",
            type: FieldTypes.TEXT,
          },
          {
            name: "createdBy.id",
            type: FieldTypes.NUMBER,
          },
          {
            name: "modifiedBy.id",
            type: FieldTypes.NUMBER,
          },
          {
            name: "deletedBy.id",
            type: FieldTypes.NUMBER,
          },
        ];
    
        const filteredChildSearchableFields = Array.isArray(this.childSearchableFields)?this.childSearchableFields.map(({ value,operation, ...rest }) => rest):[];
      

      
        return defaultFields.concat(filteredChildSearchableFields as SearchFields[]);
      }
      private updateFieldValue( value: string ): string {
        // Split the field.value by the comma
      
        // Convert the startDay string to a Date object
        const startDate = new Date(value);
        startDate.setHours(0, 0, 0, 0);
        // Set the start time to 00:00:00
      
        // Set the end time to 23:59:59
        const endDate = new Date(startDate.getTime() + 86399999);
        endDate.setHours(23, 59,59, 0);
        // Format the startDate and endDate in the desired format
        const startDateTime = startDate.toISOString().replace('T', ' ').slice(0, 24);
        const endDateTime = endDate.toISOString().replace('T', ' ').slice(0, 24);
      
        // Return the new value in the desired format
        return `${startDateTime},${endDateTime}`;
      }
}