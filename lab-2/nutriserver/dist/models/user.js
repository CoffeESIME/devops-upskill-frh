"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User {
    initSchema() {
        const schema = new mongoose_1.Schema({
            email: {
                type: String,
                unique: true,
                required: true,
                lowercase: true,
                trim: true
            },
            password: {
                type: String,
                required: true,
            }
        });
        schema.pre('save', async function (next) {
            const user = this;
            if (!user.isModified())
                return next();
            const salt = await bcrypt_1.default.genSalt(10);
            const hash = await bcrypt_1.default.hash(user.password, salt);
            user.password = hash;
            next();
        });
        schema.methods.comparePasswords = async function (password) {
            return await bcrypt_1.default.compare(password, this.password);
        };
        (0, mongoose_1.model)('User', schema);
    }
    getInstance() {
        this.initSchema();
        return (0, mongoose_1.model)('User');
    }
}
exports.User = User;
