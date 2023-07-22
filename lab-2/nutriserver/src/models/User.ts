import { model,Model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUserDocument extends Document {
    email: string;
    password: string;
    comparePasswords: (password: string)=>Promise<boolean>;
  }

export interface IUser {
    initSchema(): void;
    getInstance(): Model<IUserDocument>;
}

export class User implements IUser {
    initSchema() {
        const schema = new Schema<IUserDocument>(
            {
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
            }
        );

        schema.pre('save', async function(next){
            const user = this
            if(!user.isModified()) return next()
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(user.password, salt)
            user.password = hash
            next()
        })

        schema.methods.comparePasswords = async function (password: string): Promise<boolean> {
            return await bcrypt.compare(password, this.password)
        }


        model<IUserDocument>('User', schema)
    }

    getInstance(): Model<IUserDocument>{
        this.initSchema();
        return model<IUserDocument>('User')
    }
}

