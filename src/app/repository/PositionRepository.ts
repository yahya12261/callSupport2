import { Position } from "../models/entities/Position";
import { IPosition } from "../models/Position";
import { BaseRepository } from "./BaseRepository";

export interface IPositionRepository extends BaseRepository<Position,IPosition> {
}