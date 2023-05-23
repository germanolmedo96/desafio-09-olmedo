import { createUserRepository, existsUserRepository, findUserByIdRepository, getUserRepository } from "../repository/sessions.repository.js";

const createUserService = async(newUser) => await createUserRepository(newUser);
const existsUserService = async(username) => await existsUserRepository(username);
const getUserService = async(username) => await getUserRepository(username);
const findUserByIdService = async(id) => await findUserByIdRepository(id);

export {
    createUserService,
    existsUserService,
    getUserService,
    findUserByIdService
}