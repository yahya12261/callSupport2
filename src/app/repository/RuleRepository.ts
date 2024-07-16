import { Rule } from "../models/entities/Rule";
import { IRule } from "../models/Rule";
import { BaseRepository } from "./BaseRepository";

export interface IRuleRepository extends BaseRepository<Rule,IRule> {
    
}