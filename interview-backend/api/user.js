// import mongo from '../lib/mongo.js'
import auth from '../lib/auth.js'
import logger from '../lib/logger.js'



const user = {
    async getUsers(req, res) {
        return await mongo.getCollections({ user_name })
    }
}