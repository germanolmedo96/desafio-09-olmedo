import productsModel from "../models/products.js";

export default class Products {
    constructor() {
        console.log("trabajando en la BD con products");
    }
    
    
	get = async (queryString, options) => {
		
		const queryObject = {}
		if (queryString) {
			const queryArray = queryString.split(':');
			if(queryArray[0] == 'stock'){
				queryObject['stock'] = { $gte: queryArray[1] };
			} else {
				queryObject[queryArray[0]] = queryArray[1];
			}
		}
		
		options = {
			...options,
			lean: true,
			customLabels: {
				docs: 'payload'
			}
		}

		const result = await productsModel.paginate(queryObject, options);

		if(options.page > result.totalPages || options.page <= 0 || isNaN(options.page)) throw new err('Incorrect page request', 400);
		
		let link = `?limit=${options.limit}`;
		if(options.sort) link = `${link}&sort=${options.sort.price}`;
		if(queryString) link = `${link}&query=${queryString}`;

		let prevLink = link;
		let nextLink = link;
		prevLink = result.hasPrevPage ? `${link}&page=${result.prevPage}` : null;
		nextLink = result.hasNextPage ? `${link}&page=${result.nextPage}` : null;
		
		return {
			...result,
			prevLink,
			nextLink
		};
	}
    
    getAll = async () => {
        let products = await productsModel.find().lean();
        return products;
    }

    getOne = async (id) => {
        let product = await productsModel.findOne({_id: id}).lean();
        return product;
    }

    async getProductById(id) {
        return await productsModel.findById(id);
      }

    saveProduct = async (product) => {
        let result = await productsModel.create(product);
        return result;
    }

    updateProduct = async (id,update) => {
        let result = await productsModel.findByIdAndUpdate(id,update)
        return result;
    }

    deleteProduct = async (id) => {
        let result = await productsModel.findByIdAndDelete(id)
        return result;
    }
}