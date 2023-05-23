
import ticketModel from "../models/tickets.js";

export default class Tickets {
    constructor() {
        console.log("Working in mongoDB with tickets");
    }

    getAll = async () => {
        try {
            let tickets = await ticketModel.find();
            if(tickets.length > 0) {
                return tickets;
            }
            else {
                throw Error("Tickets not found.");
            }
        } catch (error) {
            throw {
                code: 404,
                message: 'Error getting tickets.',
                detail: error.message
            };
        }
    }

    getOne = async (id) => {
        try {
            let product = await ticketModel.findOne({ _id: id });
            return product;
        }
        catch (error) {
            console.log(error);
            return null;
        }

    }

    getTicketById =  async (id) => {
        try {
            let ticket = await ticketModel.findById(id)
            if(ticket) {
                return ticket;
            }
            else {
                throw Error("Ticket not found");
            }
        }
        catch (error) {
            throw {
                code: 404,
                message: `Error getting ticket with ID: ${id}.`,
                detail: error.message
            };
        }
    }

    createTicket = async (ticket) => {
        try {
            ticket.status = "pending";
            let resultTicket = await ticketModel.create(ticket);

            if(resultTicket){ 
                return resultTicket;
            }
            else {
                throw {
                    code: 404,
                    message: "Couldn't find the created ticket."
                }
            }
        } catch (error) {

            throw {
                code: error.code? error.code : 400,
                message: "Error creating new ticket",
                detail: error.message
            };
        }
       
    }

    createCode = async () => {
        try {
            let isCodeUnique = false;
            let ticketCode;
            // Generar código autogenerado único para el ticket
            while (!isCodeUnique) {
                ticketCode = Math.random().toString(36).substring(2, 8).toUpperCase();
                const existingTicket = await ticketModel.findOne({ code:ticketCode });
                if (!existingTicket) {
                    isCodeUnique = true;
                }
            }
            return ticketCode;
        }
        catch (error) {
            console.log(error);
            return null
        }
    }

}

    // resolveTicket = async (tid,order) => {

    //     try {
            
    //         let result = await ticketModel.updateOne({_id: tid}, {$set:order});
    //         if(result.modifiedCount > 0){
    //             let ticket = await this.getTicketById(pid);
    //             return ticket;
    //         }
    //         else {
    //             throw Error("No se pudo resolver el ticket.")
    //         }
    //     }
    //     catch (error) {
    //         throw {
    //             code: error.code? error.code : 409,
    //             message: 'Error al agregar al carrito.',
    //             detail: error.message
    //         } 
    //     }
    // }
    // deleteTicket = async (id) => {
    //     try {
    //         if(id) {
    //             let result = await ticketModel.deleteOne({_id: id});
    //             if(result.deletedCount > 0) {
    //                 return true;
    //             }
    //             else {
    //                 let cart = await this.getTicketById(id)
    //                 if(cart) {
    //                     throw Error("No se pudo borrar el carrito.")
    //                 }
    //                 else {
    //                     throw {
    //                         code: 404,
    //                         detail: "No se encontró el carrito!"
    //                     } 
    //                 }
    //             }
    //         }
    //         else {
    //             throw {
    //                 code: 400,
    //                 detail: "Valor id vacío"
    //             }
    //         }
    //     }
    //     catch (error) {
    //         throw {
    //             code: error.code,
    //             message: error.message? error.message : 'Error eliminando carrito',
    //             detail: error.detail? error.detail : error.message 
    //         }
    //     }
    // }






