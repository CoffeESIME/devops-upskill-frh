"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const passport_1 = __importDefault(require("passport"));
const userRouter = (0, express_1.Router)();
userRouter.post('/api/v1/signup', user_controller_1.default.signUp);
userRouter.post('/api/v1/signin', user_controller_1.default.signIn);
userRouter.get('/api/v1/allUsers', passport_1.default.authenticate('jwt', { session: false }), user_controller_1.default.getAll);
userRouter.get('/api/v1/generalusers', user_controller_1.default.getAll);
exports.default = userRouter;
