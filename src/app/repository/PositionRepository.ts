import { Position } from "../models/entities/Position";
import { IPosition } from "../models/Position";

export interface IPositionRepository {
    getAll(): Promise<Position[] | null>;
    add(position: IPosition): Promise<Position | null>;
    update(position: IPosition): Promise<Position | null>;
    getById(id: number): Promise<Position | null>;
}