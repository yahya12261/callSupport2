import { EntityType } from "../enum/EntityType";
import { JoinOptions } from "./JoinOptions";
import { RelationOptions } from "./RelationOptions";


export interface TypeormOptions { 
    relations?:RelationOptions;
    join?:JoinOptions;
}