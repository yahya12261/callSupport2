import { OrderByOperation } from "../enum/OrderByOperation";
import { JoinOptions } from "./JoinOptions";
import { RelationOptions } from "./RelationOptions";
import { SearchFields } from "./SearchFields";

export interface RequestElement{
    relations?:RelationOptions,
    page:number,
    pageSize:number,
    orderBy:string,
    order: "ASC" | "DESC",
    search?:SearchFields[],
    join?:JoinOptions,
    selectedElement:string[],
    
}