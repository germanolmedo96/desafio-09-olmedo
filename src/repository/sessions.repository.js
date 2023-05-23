import { USERDAO } from "../dao/index.js";

const createUserRepository = async(newUser) => await USERDAO.create(newUser);
const existsUserRepository = async(username) => await USERDAO.exists(username);
const getUserRepository = async(username) => await USERDAO.get(username);
const findUserByIdRepository = async(id) => await USERDAO.findById(id);

export {
    createUserRepository,
    existsUserRepository,
    getUserRepository,
    findUserByIdRepository
}