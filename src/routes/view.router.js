    import { Router } from "express";
    import {
        getProductsView, getCarView, getCartId, getMessageView, 
        postCardToProduct, getCardId, getRegister, getLoginView,
        profileView, getView, realTimeProductsView, chatView,viewP
    } from '../controllers/viewController.js'
    import jwt from 'jsonwebtoken';
    import { mockingProducts } from '../../src/controllers/mockingProducts.controllers.js';
    import config from '../config/config.js';
    const PRIVATE_KEY = config.SECRET;

    const router = Router();
    // const productsManager = new Products();
    // const cartsManager = new Carts();
    // const messagesManager = new Messages();

    export const publicAccess = (req, res, next) => {
        if (req.session.user) return res.redirect('/products'); 
        next();
    }

    export const privateAccess = (req, res, next) => {
        const token = req.cookies.token;
        if (token) {
        jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
            req.session.user = decoded;
            next();
        });
        } else {
        res.redirect('/login');
        }
    };
    export const privateUserAccess = (req, res, next) => {
        if (req.session.user) {
            if(req.session.user.rol === "USER") {return next()};
        } 
        return res.redirect('/login')
    }

    export const privateAdminAccess = (req, res, next) => {    
    if (req.session.user) {
        if(req.session.user.rol === "ADMIN") {return next()};
    } 
    return res.redirect('/login')
    }
    
    router.get('/products',privateAccess , getProductsView)
    // const isLogin = req.session.user ? true : false;
    // const user = req.session.user;
    // const {
    //     page=1,
    //     limit=5,
    //     sort,
    //     category="",
    // } = req.query;
    // const {docs,hasPrevPage,hasNextPage,nextPage,prevPage} = 
    // await productsModel.paginate({category:{$regex:category}} , {sort:{price:sort}, limit , page , lean:true});
    
    // const products = docs;
    // res.render('products' , {
    //     isLogin,
    //     user,
    //     products,
    //     hasPrevPage,
    //     hasNextPage,
    //     prevPage,
    //     nextPage,
    //     page
    // });
   
   

router.get('/cart', privateAccess, getCarView );
    // try {
    //     const cart = await cartsManager.getById(cartId);
    //     res.render('cart', { cart, style: 'cart.css' });
    // } catch (err) {
    //     console.log(err);
    // }

router.get('/carts/:cid', getCartId )
    // let cid = req.params.cid;
    // let cart = await cartsModel.findById(cid).populate("products.product").lean();
    // console.log(cart);
    // let cartProducts = cart.products
    // res.render('carts' , {cart, cartProducts})

router.get('/messages' , getMessageView)
    // let messages = await messagesManager.getAll();
    // console.log(messages);
    // res.render('chat' , {messages})


router.post('/cart/add/:id',privateAccess ,postCardToProduct);
    // const pid = req.params.id;

    // try {
    //     let cart;
    //     if (!cartId) {
    //         cart = await cartsManager.save();
    //         cartId = cart._id;
    //     } else {
    //         cart = await cartsManager.getById(cartId);
    //     }

    //     const cid = cart._id;
    //     await cartsManager.saveId(cid, pid);

    //     res.redirect('/products');
    // } catch (err) {
    //     console.log(err);
    // }


router.get('/cart/:cid', privateAccess, getCardId);
    // const cid = req.params.cid;
    // try {
    //     const cart = await cartsManager.getById(cid);
    //     res.render('cart', { cart, style: 'cart.css' });
    // } catch (err) {
    //     console.log(err);
    // }


    router.get('/register', publicAccess, getRegister);
    // res.render('register', { style: 'register.css' });

    router.get('/login', publicAccess, getLoginView);
    // res.render('login', { style: 'login.css' });

router.get('/profile', privateAccess, profileView );
    // res.render('profile', {
    //     user: req.session.user
    // });

router.get('/', privateAccess, getView);
    // // const products = await manager.getAll();

    // const products = await productsManager.getAll(); 
    // res.render('home', {products, style: 'home.css'});

router.get('/realtimeproducts', privateAdminAccess, realTimeProductsView);
    // res.render('realTimeProducts', {style: 'realTimeProducts.css'});

router.get('/chat', privateUserAccess, chatView);
    // res.render('chat', {style: 'chat.css'})


router.get('/products', privateAccess, viewP)
    // const { limit = 10, page = 1, sort, category, stock} = req.query;

    // let query = {};
    // if(category) query = {category : `${category}`};
    // if(stock) query = {stock : `${stock}`};
    // if(category && stock) query = {$and: [ {category : `${category}`},{stock : `${stock}`} ]}  

    // const result = await productsManager.getAllPage(limit, page, sort, query)

    // const products = result.docs; 
    // const hasPrevPage = result.hasPrevPage;
    // const prevPage = result.prevPage;
    // const hasNextPage = result.hasNextPage;
    // const nextPage = result.nextPage;
    // const Page = result.page;
    // res.render('products', {products, hasPrevPage, prevPage, hasNextPage,  nextPage, Page, cartId, user: req.session.user, style: 'home.css'})

    router.use('/mockinkg-products', mockingProducts)

export default router;



