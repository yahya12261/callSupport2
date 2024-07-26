export interface ResponseElement<T>{
    data:T[],
    currentPage:number,
    pageSize:number,
    total:number
}