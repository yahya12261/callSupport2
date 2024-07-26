"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrderOperation = exports.OrderByOperation = void 0;
var OrderByOperation;
(function (OrderByOperation) {
    OrderByOperation["DESC"] = "desc";
    OrderByOperation["ASC"] = "asc";
})(OrderByOperation || (exports.OrderByOperation = OrderByOperation = {}));
const validateOrderOperation = (op) => {
    switch (op) {
        case 'DESC':
            return "DESC";
        case 'ASC':
            return "ASC";
        default:
            return "ASC";
    }
};
exports.validateOrderOperation = validateOrderOperation;
//# sourceMappingURL=OrderByOperation.js.map