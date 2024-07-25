"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndPointsActions = EndPointsActions;
function EndPointsActions(endPointsActions) {
    return (req, res, next) => {
        req.Action = endPointsActions;
        next();
    };
}
//# sourceMappingURL=EndPointsActions.js.map