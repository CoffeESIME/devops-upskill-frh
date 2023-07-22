import { IUser, IUserDocument } from "../models/User";
import jwt from "jsonwebtoken";
import  config from '../config/config'
export function createToken(user: IUserDocument): string {
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret,{ expiresIn: 86400})
}