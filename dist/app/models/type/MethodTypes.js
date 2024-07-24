"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMethodType = exports.MethodTypes = void 0;
var MethodTypes;
(function (MethodTypes) {
    MethodTypes["POST"] = "POST";
    MethodTypes["GET"] = "GET";
    MethodTypes["PUT"] = "PUT";
    MethodTypes["PATCH"] = "PATCH";
    MethodTypes["DELETE"] = "DELETE";
})(MethodTypes || (exports.MethodTypes = MethodTypes = {}));
const getMethodType = (methodString) => {
    switch (methodString) {
        case 'POST':
            return MethodTypes.POST;
        case 'GET':
            return MethodTypes.GET;
        case 'PUT':
            return MethodTypes.PUT;
        case 'PATCH':
            return MethodTypes.PATCH;
        case 'DELETE':
            return MethodTypes.DELETE;
        default:
            throw new Error(`Invalid HTTP method: ${methodString}`);
    }
};
exports.getMethodType = getMethodType;
//# sourceMappingURL=MethodTypes.js.map