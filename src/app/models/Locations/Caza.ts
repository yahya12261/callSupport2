import { IBaseEntity } from "../baseEntity";
import { Government } from "../entities/Location/Government";
export interface ICaza extends IBaseEntity {
  name:string;
  governmentId:number;
  government:Government;
}
