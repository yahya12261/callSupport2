import { IBaseEntity } from "../baseEntity";
import { Caza } from "../entities/Location/Caza";


export interface ITown extends IBaseEntity {
  name:string;
  caza:Caza;
}
