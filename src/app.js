import express from 'express';
import __dirname from '../src/utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/view.router.js';
import { Server } from 'socket.io';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import mongoose from "mongoose";
import Messages from "./dao/dbManager/messages.js";
import messagesRouter from "./routes/messages.router.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import sessionsRouter from "./routes/session.router.js";
import ticketRouter from './routes/tickets.router.js'
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import {SessMidleware } from './dao/dbConfig.js';
import config from './config/config.js'; 

import Products from './dao/dbManager/products.js';
import Chat from './dao/dbManager/messages.js'

import CustomError from "./services/errors/CustomError.js";
import EErrors from "./services/errors/enum.js";
import { generateProductErrorInfo } from "./services/errors/info.js";

const port = config.port

//INICIALIZAMOS EXPRESS
const app = express(); //TRAEMOS EXPRESS
const httpServer =  app.listen(port, console.log(`Server activado, puerto:  ${port}`)) //levantamos el servido

// mongoose.set("strictQuery", false);
// mongoose.connect('mongodb+srv://germanolmedo96:159coderhouse@cluster0.ovef7zu.mongodb.net/?retryWrites=true&w=majority',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })

app.engine('handlebars', handlebars.engine()); //agregamos handlebars a express

app.set('views', __dirname + '/views'); //seteamos las views
app.set('view engine', 'handlebars'); //seteamos las vistas con handlebars

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); //usamos la carpeta estatica para el servidor
app.use(cookieParser());
app.use(SessMidleware)


initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewRouter); //usamos la ruta de  viewRouter
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/messages', messagesRouter)
app.use('/api/session', sessionsRouter);
app.use('/api/ticket', ticketRouter)


//on = escuchar / recibir 
//emit = hablar / enviar
const io = new Server(httpServer);

const messagesManager = new Messages();
const productsManager = new Products();
const chatManager = new Chat();

const messages = [];

io.on('connection', async socket => {
    console.log("Cliente conectado")
    
    //web productos
    // const products = await manager.getAll();
    const products = await productsManager.getAll();

    io.emit('products', products);

    socket.on('newProduct',  async  data => {
        console.log(data);
        if(!data.title || !data.description || !data.code || !data.price || !data.stock || !data.category){
            // return res.status(400).send({status: 'error', message:'Valores incompletos'});
            throw CustomError.createError({
                name: 'UserError',
                cause: generateProductErrorInfo({
                    title: data.title,
                    description: data.description,
                    code: data.code,
                    price: data.price,
                    stock: data.stock, 
                    category: data.category
                }),
                message: 'Error tratando de crear un producto',
                code: EErrors.INVALID_TYPES_ERROR
            });
        }
        await productsManager.save(data);
        // await manager.save(data);
        const productsAll = await productsManager.getAll();
        io.emit('products', productsAll);
    })
    
    socket.on('spliced', async data => {
        await productsManager.deleteById(data);
        // await manager.deleteById(data);

        const productsAll = await productsManager.getAll();
        io.emit('products', productsAll);
    })


    //web chat
    socket.on('message', async data => {
        messages.push(data);
        await chatManager.save(data);
        io.emit('messageLogs', messages);
    });

    socket.on('authenticated', data => {
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected', data);
    });
}); //hacemos que el socket escuche cuando el cliente  se conecte y mande un mensaje de que se conecto

