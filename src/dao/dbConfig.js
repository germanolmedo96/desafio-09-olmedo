import mongoose from 'mongoose'; 
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from '../config/config.js'; 

const URI = config.mongoUrl
const  SECRET = config.SECRET

try{
    mongoose.set("strictQuery", false);
    await mongoose.connect(URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("conectado a BD")
}
catch(err){
    console.log(err,"error en la conexion de mongo")
}

 const SessMidleware = session({
    store:MongoStore.create({
        mongoUrl: URI,
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl: 3600
    }),
    secret: SECRET,
    resave:true,
    saveUninitialized:true
})
 


export {
    SessMidleware
}