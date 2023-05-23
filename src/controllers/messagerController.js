import Messages from "../dao/dbManager/messages.js";
const messagesManager = new Messages();

export const getAllMessage = async(req,res)=>{
    let messages = await messagesManager.getAll();
    res.send({status:"success" , payload:messages})
}

export default  getAllMessage
