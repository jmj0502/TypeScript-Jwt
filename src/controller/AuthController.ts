// importing the required modules.
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";


// Building our controller up.
export class AuthController {

    // validator.
    static authValidator = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const header = req.headers['x-access-token'];
            console.log(header);
            if (header) {
                const token = header.split(' ');
                const authToken = token[1];
                if (token) {
                    let authorized: any;
                    authorized = await jwt.verify(authToken, 'mysecret');
                    console.log(authorized);
                    if(authorized) {
                        next();
                    } else {
                        res.json({Error: 'You\'re not authorized, so you shouldn\'t be in here!'});
                    }
                } else {
                    res.json({Error: 'No token provided'});
                }
            } else {
               res.json({Error: 'No token provided'}); 
            }

        } catch (err) {
            console.log(err);
        }
    }

}