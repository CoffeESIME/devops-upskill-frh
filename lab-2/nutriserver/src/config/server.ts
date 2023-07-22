import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv';
import userRouter from '../routes/user.routes'
import passport from 'passport';
import passportMiddleware from '../middlewares/passport'
dotenv.config();
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 4200;

//initializations
const server = express();
server.set('port', port);
//settings
//middlewares
server.use(cors())
server.use(morgan('dev'))
server.use(express.urlencoded({ extended: false }))
server.use(express.json());
server.use(passport.initialize());
passport.use(passportMiddleware)
//routes
server.use(userRouter)
server.get('/', async (req, res) => {
    return res.send('API is working')
});


export default server
