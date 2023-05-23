import userModel from "../models/user.js";

export default class Users {
	constructor() {};

	exists = async (email) => {
        return await userModel.findOne({ email }) ? true : false;
    };

	get = async (email) => {
        return await userModel.findOne({ email });
    };

	findById = async (id) => {
        return await userModel.findById(id);
    };


    create = async (user) => {
        if(user.email.startsWith('admin')) user['rol'] = 'admin';
        const result = await userModel.create(user);
        return result;
    };
}