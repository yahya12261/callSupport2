export enum QueryOperator {
    EQUAL = '=',
    NOT_EQUAL = '!=',
    GREATER_THAN = '>',
    GREATER_THAN_OR_EQUAL = '>=',
    LESS_THAN = '<',
    LESS_THAN_OR_EQUAL = '<=',
    LIKE = 'LIKE',
    ILIKE = 'ILIKE',
    NOT_LIKE = 'NOT_LIKE',
    NOT_ILIKE = 'NOT_ILIKE',
    BEGINS_WITH = 'BEGINS_WITH',
    ENDS_WITH = 'ENDS_WITH',
    IN = 'IN',
    NOT_IN = 'NOT_IN',
    BETWEEN = 'BETWEEN',
    NOT_BETWEEN = 'NOT_BETWEEN',
    IS = 'IS',
    IS_NOT = 'IS_NOT',
  }
  export function getQueryOperatorFromString(operatorString: string): QueryOperator | undefined {
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