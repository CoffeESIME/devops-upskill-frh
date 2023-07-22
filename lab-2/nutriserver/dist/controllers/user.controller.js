"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const user_service_1 = require("../services/user.service");
const User_1 = require("../models/User");
const token_1 = require("../utils/token");
const userService = new user_service_1.UserService(new User_1.User().getInstance());
class UserController extends controller_1.default {
    constructor(service) {
        super(service);
    }
    async signUp(req, res) {
        console.log('here we have the password', req.body);
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }
        const user = await userService.model.findOne({ email: req.body.email });
        if (user) {
            console.log(user);
            return res.status(400).json({ msg: "User already exists" });
        }
        const newUser = new userService.model(req.body);
        await newUser.save();
        return res.status(201).json(newUser);
    }
    async signIn(req, res) {
        const user = await userService.model.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const match = await user.comparePasswords(req.body.password);
        if (match) {
            return res.status(200).json({ token: (0, token_1.createToken)(user) });
        }
        return res.status(403).json({ msg: 'The email or password is incorrect' });
    }
}
const userController = new UserController(userService);
exports.default = userController;
