import express, { NextFunction, Request, Response, Router } from 'express';
import { RuleService } from '../services/RuleService';
import { Rule } from '../models/entities/Rule';
import { EntityType } from '../enum/EntityType';
import { getMethodType, MethodTypes } from '../enum/MethodTypes';
import { IRule } from "../models/Rule";
import { IEndPoints } from '../interface/IEndPoints';
import RuleController from '../controllers/RuleController';

export class EndPoints {
  private router: Map<string, express.Router> = new Map();

  constructor(router: Map<string, express.Router>) {
    this.router = router;
    this.getAllRoutes();
  }

  private traverseRoutes(routeName: string, r: express.Router, path: string = ''): Array<RouteInfo> {
    const routes: Array<RouteInfo> = [];

    r.stack.forEach((middleWare) => {
      if (middleWare.route) { // Route
        const route = middleWare.route;
        const routeInfo: RouteInfo = {
          path: routeName + path + route.path,
          method: Object.keys(route.methods)[0].toUpperCase(),
          middleware: route.stack.map((m: express.NextFunction) => {
            return m.name || 'anonymous';
          }),
          handler: route.stack[route.stack.length - 1].handle,
          params: route.paramNames,
        };
        routes.push(routeInfo);

        // Generate rule
        // const ruleService: RuleService = new RuleService(Rule);
        const ruleController = new RuleController();
        const rule: IEndPoints = {
          methodType: getMethodType(routeInfo.method),
          path: routeInfo.path,
        };
        ruleController.addEndPointsRule(rule);
      } else if (middleWare.handle instanceof express.Router) { // Router
        routes.push(
          ...this.traverseRoutes(
            routeName + path + middleWare.regexp.source.replace(/\\\//g, '/'),
            middleWare.handle,
            ''
          )
        );
      }
    });

    return routes;
  }

  public getAllRoutes(): Array<RouteInfo> {
    const routes: Array<RouteInfo> = [];

    for (const [key, value] of this.router) {
      routes.push(...this.traverseRoutes(key, value));
    }

    return routes;
  }
}

interface RouteInfo {
  path: string;
  method: string;
  middleware?: any[];
  handler?: any;
  params?: any;
}