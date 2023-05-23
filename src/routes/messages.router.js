import { Router } from "express";
// import Messages from "../dao/dbManager/messages.js";
import {getAllMessage} from '../controllers/messagerController.js'



const router = Router();
// const messagesManager = new Messages();

router.get('/' ,getAllMessage )
    // let messages = await messagesManager.getAll();
    // res.send({status:"success" , payload:messages})





export default router;