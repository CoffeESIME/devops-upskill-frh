import Controller from './controller';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { Request, Response } from 'express';
import { createToken } from '../utils/token';
const userService = new UserService(new User().getInstance());

class UserController extends Controller<UserService> {
    constructor(service: UserService) {
        super(service);
    }
    async signUp(req: Request, res: Response): Promise<Response> {
        console.log('here we have the password', req.body)
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ msg: "Invalid email or password" })
        }
        const user = await userService.model.findOne({ email: req.body.email })
        if (user) {
            console.log(user)
            return res.status(400).json({ msg: "User already exists" })
        }
        const newUser = new userService.model(req.body)
        await newUser.save()
        return res.status(201).json(newUser)
    }
    async signIn(req: Request, res: Response): Promise<Response> {
        const user = await userService.model.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const match = await user.comparePasswords(req.body.password)
        if (match) {

            return res.status(200).json({ token: createToken(user) })
        }
        return res.status(403).json({msg:'The email or password is incorrect'})
    }
}

const userController = new UserController(userService);

export default userController;
