import { User, IUser, IUserDocument} from '../models/User'
import {Service} from './service'
import { IService } from './service.interfaces'
import {Model, Document} from 'mongoose'

export class UserService extends Service<IUserDocument> {
    
    constructor(model: Model<IUserDocument & Document>){
        super(model)
    }
}
