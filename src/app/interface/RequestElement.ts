import { OrderByOperation } from "../enum/OrderByOperation";
import { SearchFields } from "./SearchFields";

export interface RequestElement{
    relations?:string[],
    page:number,
    pageSize:number,
    orderBy:string,
    order: "ASC" | "DESC",
    search?:SearchFields[]
}