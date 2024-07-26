"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryOperator = void 0;
exports.getQueryOperatorFromString = getQueryOperatorFromString;
var QueryOperator;
(function (QueryOperator) {
    QueryOperator["EQUAL"] = "=";
    QueryOperator["NOT_EQUAL"] = "!=";
    QueryOperator["GREATER_THAN"] = ">";
    QueryOperator["GREATER_THAN_OR_EQUAL"] = ">=";
    QueryOperator["LESS_THAN"] = "<";
    QueryOperator["LESS_THAN_OR_EQUAL"] = "<=";
    QueryOperator["LIKE"] = "LIKE";
    QueryOperator["ILIKE"] = "ILIKE";
    QueryOperator["NOT_LIKE"] = "NOT_LIKE";
    QueryOperator["NOT_ILIKE"] = "NOT_ILIKE";
    QueryOperator["BEGINS_WITH"] = "BEGINS_WITH";
    QueryOperator["ENDS_WITH"] = "ENDS_WITH";
    QueryOperator["IN"] = "IN";
    QueryOperator["NOT_IN"] = "NOT_IN";
    QueryOperator["BETWEEN"] = "BETWEEN";
    QueryOperator["NOT_BETWEEN"] = "NOT_BETWEEN";
    QueryOperator["IS"] = "IS";
    QueryOperator["IS_NOT"] = "IS_NOT";
})(QueryOperator || (exports.QueryOperator = QueryOperator = {}));
function getQueryOperatorFromString(operatorString) {
    switch (operatorString.toUpperCase()) {
        case 'EQUAL':
            return QueryOperator.EQUAL;
        case 'NOT_EQUAL':
            return QueryOperator.NOT_EQUAL;
        case 'GREATER_THAN':
            return QueryOperator.GREATER_THAN;
        case 'GREATER_THAN_OR_EQUAL':
            return QueryOperator.GREATER_THAN_OR_EQUAL;
        case 'LESS_THAN':
            return QueryOperator.LESS_THAN;
        case 'LESS_THAN_OR_EQUAL':
            return QueryOperator.LESS_THAN_OR_EQUAL;
        case 'LIKE':
            return QueryOperator.LIKE;
        case 'ILIKE':
            return QueryOperator.ILIKE;
        case 'NOT_LIKE':
            return QueryOperator.NOT_LIKE;
        case 'NOT_ILIKE':
            return QueryOperator.NOT_ILIKE;
        case 'BEGINS_WITH':
            return QueryOperator.BEGINS_WITH;
        case 'ENDS_WITH':
            return QueryOperator.ENDS_WITH;
        case 'IN':
            return QueryOperator.IN;
        case 'NOT_IN':
            return QueryOperator.NOT_IN;
        case 'BETWEEN':
            return QueryOperator.BETWEEN;
        case 'NOT_BETWEEN':
            return QueryOperator.NOT_BETWEEN;
        case 'IS':
            return QueryOperator.IS;
        case 'IS_NOT':
            return QueryOperator.IS_NOT;
        default:
            return QueryOperator.EQUAL;
    }
}
//# sourceMappingURL=WhereOperations.js.map