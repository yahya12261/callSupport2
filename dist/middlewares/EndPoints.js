"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndPoints = void 0;
const express_1 = __importDefault(require("express"));
const RuleService_1 = require("../app/services/RuleService");
const Rule_1 = require("../app/models/entities/Rule");
const MethodTypes_1 = require("../app/models/type/MethodTypes");
const RuleController_1 = __importDefault(require("../app/controllers/RuleController"));
class EndPoints {
    static getAllRoutes(routeName, router) {
        const routes = [];
        function traverseRoutes(r, path = '') {
            r.stack.forEach((middleWare) => {
                if (middleWare.route) { // Route
                    const route = middleWare.route;
                    routes.push({
                        path: routeName + path + route.path,
                        method: Object.keys(route.methods)[0].toUpperCase(),
                        middleware: route.stack.map((m) => {
                            return m.name || 'anonymous';
                        }),
                        handler: route.stack[route.stack.length - 1].handle,
                        params: route.paramNames
                    });
                }
                else if (middleWare.handle instanceof express_1.default.Router) { // Router
                    traverseRoutes(middleWare.handle, path + middleWare.regexp.source.replace(/\\\//g, '/'));
                }
            });
        }
        traverseRoutes(router);
        this.routes = routes;
        return routes;
    }
}
exports.EndPoints = EndPoints;
_a = EndPoints;
EndPoints.routes = [];
EndPoints.generateRule = () => {
    const ruleService = new RuleService_1.RuleService(Rule_1.Rule);
    const ruleController = new RuleController_1.default(ruleService);
    _a.routes.forEach(route => {
        const rule = {
            methodType: (0, MethodTypes_1.getMethodType)(route.method),
            path: route.path
        };
        ruleController.addEndPointsRule(rule);
    });
};
//# sourceMappingURL=EndPoints.js.map