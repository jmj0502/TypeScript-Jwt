import { getRepository } from "typeorm";
import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Users } from "../entity/User";


export class UserController {

    //building our user controllers up.
    static getUsers = async (req: Request, res: Response) => {
        try {
            const userRepo = await getRepository(Users);
            const users = await userRepo.find();
            res.json(users);
        } catch(err) {
            console.log(err);
        }
    }


    static getUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userRepo = getRepository(Users);
            const user = await userRepo.findOne({where: id});
            res.json(user);
        } catch(err) {
            console.log(err);
        }
    }


    static createUser = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const getRepo = getRepository(Users);
            const user = await getRepo.findOne({userName: username});
            if (!user) {
                const salt = await bcrypt.genSalt(12);
                const hashedPassword = await bcrypt.hash(password, salt);
                let newUser = new Users();
                newUser.userName = username;
                newUser.password = hashedPassword;
                const savedUser = await getRepo.save(newUser);
                const token = await jwt.sign({ id: savedUser.id }, 'mysecret', {
                    expiresIn: 60 * 60 * 2
                });
                res.json({ Success: 'user created' + savedUser, token: token });
            } else {
                res.json({Error: 'Username alredy in use!'});
            }
            
        } catch(err) {
            console.log(err);
        }
    }


    static modifyPassword = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const getRepo = getRepository(Users);
            const userExist = await getRepo.findOne({userName: username});
            console.log(userExist);
            if (userExist) {
                const salt = await bcrypt.genSalt(12);
                const hashedPassword = await bcrypt.hash(password, salt);
                userExist.password = hashedPassword;
                const updated = await getRepo.save(userExist);
                res.json({Success: 'Your new password is ' + password, updated});
            } else {
                res.json({Error: 'User not found!'});
            }
            
        } catch(err) {
            console.log(err);
        }
    }


    static login = async (req:Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const getRepo = getRepository(Users);
            const user = await getRepo.findOne({userName: username});
            //in case a user exist.
            if (user) {
                const valid = await bcrypt.compare(password, user.password);
                if (valid) {
                    const token = await jwt.sign({id: user.id}, 'mysecret', {
                        expiresIn: 60*60*2
                    });
                    res.json({Auth: true, token: token});
                } else {
                    res.json({Error: 'Invalid password!'});
                }
            } else {
                res.json({Error: 'Username not found'});
            }
        } catch(err) {
            console.log(err);
        }
    }


    static deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const getRepo = getRepository(Users);
            const deletedUser = await getRepo.delete(id);
            res.json({Deleted: 'User deleted! ' + deletedUser});
        } catch (err) {
            console.log(err);
        }
    }

}