"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
(async () => {
    mongoose_1.default.connect(config_1.default.DB.URI);
    const connection = mongoose_1.default.connection;
    connection.once('open', () => {
        console.log(`establishing connection with  URL ${config_1.default.DB.URI}`);
        console.log(`DB connection established, to ${connection.db.databaseName}`);
    });
    connection.on('error', (error) => {
        console.error(error);
        process.exit(0);
    });
})();
