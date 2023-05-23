import { addOneRepository, deleteOneByIdRepository, getAllRepository, getByIdRepository, updateOneByIdRepository } from "../repository/products.repository.js";
import { errorWithStatusCode as err } from "../utils.js";

const getAllService = async(query, options) => await getAllRepository(query, options);

const getByIdService = async(pid) => await getByIdRepository(pid);

const addOneService = async(product) => {
    const { title, category, price, stock, description, thumbnail, code } = product;
	if(!title || !category || !price || !stock || !description || !thumbnail || !code){
		throw new err('Incomplete Values', 400);
	}
    await addOneRepository(product);
};

const updateOneByIdService = async(pid, product) => {
    const { title, category, price, stock, description, thumbnail, code } = product;
	if(!title || !category || !price || !stock || !description || !thumbnail || !code){
		throw new err('Incomplete Values', 400);
	}
    await updateOneByIdRepository(pid, product)
};

const deleteOneByIdService = async(id) => await deleteOneByIdRepository(id);


export {
    getAllService,
    getByIdService,
    addOneService,
    updateOneByIdService,
    deleteOneByIdService
}