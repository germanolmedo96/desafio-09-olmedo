import Carts from "../dao/dbManager/carts.js";
import Products from "../dao/dbManager/products.js";
import { isProductInCartService, getByIdService, updateService, updateManyService, deleteAllService, deleteByIdService } from "../services/carts.service.js";


const cartsManager = new Carts();
const productManager = new Products();

export const getCarts = async(req, res)=>{
    let carts = await cartsManager.getAll();
    res.send({status:"success" , payload:carts})
}

export const savePostCart = async(req, res)=>{
    const result = await cartsManager.saveCart();
    res.send({status:"success" , payload:result});
}

export const postProducts = async(req,res)=>{
    const { cid, pid } = req.params;
	try {
		const result = await updateService(cid, pid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
    // const { cid, pid } = req.params;
    // const product = await productManager.getProductById(pid);
    // if (product.id) {
    //   const cart = await cartsManager.addProductToCart(cid, pid);
    //   res.json(cart);
    //   return;
    // }
    // res.json({ msg: `El producto con el id ${pid} no existe.` });
}

export const deleteProduct = async(req,re)=>{
    const { cid, pid } = req.params;
	try {
		const result = await deleteByIdService(cid, pid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }

    // let cid = req.params.cid;
    // let pid = req.params.pid;

    // let productExist = await productManager.getOne(pid);
    // if (!productExist) {
    //     res.send({ status: 404, message: "Producto no existente" });
    // }
    // else {
    //     let cart = await cartsManager.getOne(cid);
    //     if (!cart) {
    //         res.send({ status: 404, message: "El carrito no existe" });
    //     }
    //     else {
    //         let productInCartIndex = cart.products.findIndex(p => p.product === pid)
    //         if (productInCartIndex == -1) {
    //             res.send({ status: 404, message: "El producto no existe dentro del carrito" });
    //         }
    //         else {
    //             cart.products.splice(productInCartIndex, 1);
    //             let result = await cartsManager.updateCart(cid, cart);
    //             res.send({ status: "Ok", payload: result });
    //         }
    //     }


    // }
}

export const putProduct = async(req,res)=>{
    const { cid } = req.params;
	const productsToUpdate = req.body;
	try {
        const result = await updateManyService(cid, productsToUpdate);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
    // let cid = req.params.cid;
    // let products = req.body;

    // let cart = await cartsManager.getOne(cid);
    // let cartProducts = cart.products;

    // let productsIds = [];
    // if (cartProducts.length > 0) {
    //     cartProducts.forEach(product => {
    //         productsIds.push(product._id);
    //     })
    // }

    // products.forEach(async(product) => {
    //     let productIndex = productsIds.findIndex((p)=> p == product._id);
    
    //     if (productIndex != -1) {
    //         cartProducts[productIndex].quantity = product.quantity;
    //     } else {
    //         cartProducts.push(product);
    //     }
    // })

    // cart.products = cartProducts;
    // let result = await cartsManager.updateCart(cid, cart);
    // res.send({status:"success" , payload:result});
}

export const putProductToCart = async(req,res)=>{
	const { cid, pid } = req.params;
	const quantity = req.body;
	try {
		if(await isProductInCartService(cid, pid) == -1) throw new err('Can not update product quantity because it has not been added to cart', 400);
		const result = await updateService(cid, pid, quantity.quantity);
		res.send(
            {
                status: 'Success',
                payload: result
            }
        );
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }

    // let cid = req.params.cid;
    // let pid = req.params.pid;
    // let {quantity} = req.body;
    
    // let cart = await cartsManager.getOne(cid);
    // let productExist = false;
    // cart.products.forEach(product => {
    //     if (product._id == pid) {
    //         product.quantity = quantity;
    //         productExist = true
    //     }
    // })
    // if (productExist === true) {
    //     let result = await cartsManager.updateCart(cid, cart);
    //     res.send({status: "Success", payload: result});
    // } else {
    //     res.send({status: 404, payload: "El producto no existe en el carrito"});
    // }
}

export const deleteP = async(req,res)=>{
	const { cid } = req.params;
	try {
		const result = await deleteAllService(cid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }

    // const cid = req.params.cid;
    // let cart = await cartsManager.getOne(cid);
    // cart.products = [];
    // let result = await cartsManager.updateCart(cid,cart);
    // res.send({status: "Success", payload: result});
}

export const purchasee = async (req, res) => {
    try {
      const { cid } = req.params;
      if (isInvalidId(cid))
        return res.status(400).send({ status: "error", message: "Invalid id" });
  
      const cart = await getCartService(cid);
      if (!cart)
        return res
          .status(404)
          .send({ status: "error", message: "cart not found" });
  
      const result = await purchaseService(cart, req.user.email);
      if (result.products.length === 0)
        return res.send({
          status: "success",
          message: `Purchase success. We send you an email`,
          result,
        });
  
      if (result?.ticket) {
        return res.send({
          status: "success",
          message: `Purchase success. We send you an email. There is not enough stock of some products. Which were left in the cart. `,
          result,
        });
      }
  
      res.send({
        status: "error",
        message: `There is not enough stock of products. Which were left in the cart`,
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  };

export default{
    getCarts,
    savePostCart,
    postProducts,
    deleteProduct,
    putProduct,
    putProductToCart,
    deleteP,
    purchasee
    
}