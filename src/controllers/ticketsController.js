import Ticket from "../dao/dbManager/tickets.js";
import User from "../dao/dbManager/users.js";

const ticketService = new Ticket();
const userService = new User();



export const getTickets = async (req,res) => {
    let result = await ticketService.getAll();
    res.send({status:"success",result:result})
}

export const createTicket = async (req,res) => {
        try {
        const {username,products} = req.body;
        const resultUser = await userService.getUserByUsername(username);
        const resultProducts = await fetch('http://localhost:8080/api/products/?limit=999')
        .then( (response) => response.json());
        let actualTickets = products.filter(product=> {
            let flag = false;
            resultProducts.payload.forEach(element => {
                if(element._id == product.product._id){
                    flag = true
                }
            });
            return flag;
        })
        let sum = actualTickets.reduce((acc,prev)=>{
            acc += prev.product.price * prev.quantity 
            return acc;
        },0)
        let ticketNumber = Date.now() + Math.floor(Math.random()*10000+1)
        
        let ticket = {
            code: ticketNumber,
            purchaser: username,
            purchase_datetime: new Date(),
            products: actualTickets.map(product=>product.product._id),
            amount: sum,
        }

        const ticketResult = await ticketService.createTicket(ticket);
        resultUser.orders.push(ticketResult._id)
        await userService.updateUser({username}, resultUser)
        res.send({status: 200, payload: ticketResult});
    }   
    catch(error) {
        next(error)
    }
}



export const getTicketById = async (req,res) => {
    res.send({status:"success",result:result})
}


export const resolveTicket = async (req,res) => {
    res.send({status:"success",result:result})
}

export default{
    getTickets,
    createTicket,
    getTicketById,
    resolveTicket
}

