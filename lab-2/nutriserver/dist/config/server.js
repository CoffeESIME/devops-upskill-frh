"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../middlewares/passport"));
dotenv_1.default.config();
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 4200;
//initializations
const server = (0, express_1.default)();
server.set('port', port);
//settings
//middlewares
server.use((0, cors_1.default)());
server.use((0, morgan_1.default)('dev'));
server.use(express_1.default.urlencoded({ extended: false }));
server.use(express_1.default.json());
server.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
//routes
server.use(user_routes_1.default);
server.get('/', async (req, res) => {
    return res.send('API is working');
});
exports.default = server;
