import { getRepository } from "typeorm";
import { Testy } from "../models/entities/Testy";
import { ITesty } from "../models/Testy";
import { ITestyRepository } from "../repository/TestyRepository";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";

export class TestyService implements ITestyRepository {
async add(model: ITesty): Promise<Testy | null> {
    const { name ,id} = model;
    const user = new Testy();
    user.name = name;
    user.id = id;
    const userRepository = getRepository(Testy);
    try {
        const savedUser = await userRepository.save(user);
        return savedUser;
    } catch (e) {
        console.log(e);
        return Promise.reject(new APIError('User Already exists', Err.EmailAlreadyExists));
    }
}
}