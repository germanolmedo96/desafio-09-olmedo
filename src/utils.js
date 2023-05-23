import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';	
import passport from "passport";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password); 

export const passportCall = (strategy) => {
	return async (req, res, next) => {
	  passport.authenticate(strategy, function (err, user, info) {
		if (err) return next(err);
  
		if (!user) {
		  return res
			.status(401)
			.send({ error: info.messages ? info.messages : info.toString() });
		}
  
		req.user = new UsersDto(user);
		next();
	  })(req, res, next);
	};
  };
  

export class errorWithStatusCode extends Error {
	constructor(message, httpStatusCode) {
			super(message);
			this.httpStatusCode = httpStatusCode;
	}
}

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(10),
        price: faker.commerce.price(),
        status: faker.helpers.arrayElement(["true", "false"]),
        stock: faker.string.numeric(1),
        category: faker.commerce.department(),
        thumbnails: faker.image.url(),
        id: faker.database.mongodbObjectId(),    
    }
}

export default __dirname;