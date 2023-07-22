import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import config from '../config/config'

import userController from '../controllers/user.controller'
const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

export default new Strategy(options, async (payload, done) => {
    try {
        const user = await userController.service.model.findById(payload.id)
        if (user) {
            return done(null, user)
        }
        return done(null,false)
    } catch (error) {
        console.error(error)
    }

})