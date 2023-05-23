import { PRODUCTDAO } from "../dao/index.js";

const getAllRepository = async(query, options) => await PRODUCTDAO.get(query, options);
const getByIdRepository = async(pid) => await PRODUCTDAO.getById(pid);
const addOneRepository = async(product) => await PRODUCTDAO.saveProduct(product);
const updateOneByIdRepository = async(pid, product) => await PRODUCTDAO.update(pid, product);
const deleteOneByIdRepository = async(id) => await PRODUCTDAO.delete(id);

export {
    getAllRepository,
    getByIdRepository,
    addOneRepository,
    updateOneByIdRepository,
    deleteOneByIdRepository
}