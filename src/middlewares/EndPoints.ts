import express, { NextFunction, Request, Response, Router } from 'express';
import { RuleService } from '../app/services/RuleService';
import { Rule } from '../app/models/entities/Rule';
import { EntityType } from '../app/models/type/EntityType';
import { getMethodType, MethodTypes } from '../app/models/type/MethodTypes';
import { IRule } from "../app/models/Rule";
import { IEndPoints } from '../app/models/type/IEndPoints';
import RuleController from '../app/controllers/RuleController';
export class EndPoints {
static routes: Array<RouteInfo> = [];
  public static getAllRoutes(routeName:string,router: express.Router): Array<RouteInfo> {
    const routes: Array<RouteInfo> = [];

    function traverseRoutes(r: express.Router, path: string = ''): void {
      r.stack.forEach((middleWare) => {
        if (middleWare.route) { // Route
          const route = middleWare.route;
          routes.push({
            path: routeName + path + route.path,
            method: Object.keys(route.methods)[0].toUpperCase(),
            middleware: route.stack.map((m:express.NextFunction) =>{
                return m.name || 'anonymous'}),
            handler: route.stack[route.stack.length - 1].handle,
            params: route.paramNames
          });
          
        } else if (middleWare.handle instanceof express.Router) { // Router
          traverseRoutes(middleWare.handle, path + middleWare.regexp.source.replace(/\\\//g, '/'));
        }
      });
    }

    traverseRoutes(router);
    this.routes = routes;
    return routes;
  }


  public static generateRule=()=>{
    const ruleService: RuleService = new RuleService(Rule);
    const ruleController = new RuleController(ruleService);
    this.routes.forEach(route=>{
        const rule : IEndPoints = {
            methodType : getMethodType(route.method),
            path: route.path
        } ;
    ruleController.addEndPointsRule(rule);
    })
  }
}
interface RouteInfo {
    path: string;
    method: string;
    middleware?: any[];
    handler?: any;
    params?: any;
  }