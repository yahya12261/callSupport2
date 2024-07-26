"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndPoints = void 0;
const express_1 = __importDefault(require("express"));
const RuleService_1 = require("../services/RuleService");
const Rule_1 = require("../models/entities/Rule");
const MethodTypes_1 = require("../enum/MethodTypes");
const RuleController_1 = __importDefault(require("../controllers/RuleController"));
class EndPoints {
    constructor(router) {
        this.router = new Map();
        this.router = router;
        this.getAllRoutes();
    }
    traverseRoutes(routeName, r, path = '') {
        const routes = [];
        r.stack.forEach((middleWare) => {
            if (middleWare.route) { // Route
                const route = middleWare.route;
                const routeInfo = {
                    path: routeName + path + route.path,
                    method: Object.keys(route.methods)[0].toUpperCase(),
                    middleware: route.stack.map((m) => {
                        return m.name || 'anonymous';
                    }),
                    handler: route.stack[route.stack.length - 1].handle,
                    params: route.paramNames,
                };
                routes.push(routeInfo);
                // Generate rule
                const ruleService = new RuleService_1.RuleService(Rule_1.Rule);
                const ruleController = new RuleController_1.default(ruleService);
                const rule = {
                    methodType: (0, MethodTypes_1.getMethodType)(routeInfo.method),
                    path: routeInfo.path,
                };
                ruleController.addEndPointsRule(rule);
            }
            else if (middleWare.handle instanceof express_1.default.Router) { // Router
                routes.push(...this.traverseRoutes(routeName + path + middleWare.regexp.source.replace(/\\\//g, '/'), middleWare.handle, ''));
            }
        });
        return routes;
    }
    getAllRoutes() {
        const routes = [];
        for (const [key, value] of this.router) {
            routes.push(...this.traverseRoutes(key, value));
        }
        return routes;
    }
}
exports.EndPoints = EndPoints;
//# sourceMappingURL=EndPoints.js.map