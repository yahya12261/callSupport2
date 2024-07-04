import { Testy } from "../models/entities/Testy";

export interface ITestyRepository {
    add(user: Testy): Promise<Testy | null>;
}