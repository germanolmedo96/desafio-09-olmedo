
import Carts from "./dbManager/carts.js";
import Products from "./dbManager/products.js";
import Users from "./dbManager/users.js";
import Tickets from "./dbManager/tickets.js";

const mongoCartsDao = new Carts();
const mongoProductsDao = new Products();
const mongoUsersDao = new Users();
const mongoTickesDao = new Tickets();

export const CARTDAO = mongoCartsDao;
export const PRODUCTDAO = mongoProductsDao;
export const USERDAO = mongoUsersDao;
export const TICKETDAO = mongoTickesDao;