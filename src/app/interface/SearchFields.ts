import { FieldTypes } from "../enum/FieldTypes";
import { QueryOperator } from "../enum/WhereOperations";

export interface SearchFields {
    name:string,
    type:FieldTypes,
    operation?:QueryOperator,
    value?:any
} 