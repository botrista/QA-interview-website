// import mongo from '../lib/mongo'
import mongoLocal from '../lib/mongoLocal'
import _ from 'lodash'
import resFormat from '../lib/resFormat'

const user = {

  async get() {
    const userData = await mongoLocal.findAll()
    
    return resFormat.return(userData)
  },
  async getUser(user_id) {
    const userData = await mongoLocal.find(user_id)

    return resFormat.return(userData)
  },
  async deleteUser(user_id) {
    const userData = await mongoLocal.delete(user_id)
    if (userData === false) {
      return resFormat.return('User not found', 404)
    }

    return resFormat.return(userData)
  },
  async post(data) {
    if (!data.user_name) return resFormat.return('user_name is required', 400)
    if (!data.email) return resFormat.return('email is required', 400)
    if (!data.password) return resFormat.return('password is required', 400)
    const payload = {
      user_name: data.user_name,
      email: data.email,
      password: data.password,
    }

    const result = await mongoLocal.add(payload)
    // if (!result._id) {
    //   return resFormat.return('Internal server error', 500)
    // }

    return resFormat.return(result)
  },
  async put(user_id, data) {
    if (!data.user_name) return resFormat.return('user_name is required', 400)
    if (!data.email) return resFormat.return('email is required', 400)
    if (!data.password) return resFormat.return('password is required', 400)
    const user_data = await mongoLocal.find(user_id)
    if (_.isUndefined(user_data)) return resFormat.return('Not found the user', 400)
    
    const payloads = {
      user_name: data.user_name,
      email: data.email,
      password: data.password,
    }

    const result = await mongoLocal.update(user_id, payloads)
    // if (!result._id) {
    //   return resFormat.return('Internal server error', 500)
    // }

    return resFormat.return(result)
  },
  async login(data) {
    const payload = {
      user_name: data.user_name,
      password: data.password,
    }

    const result = await mongo.loginUser(payload)
    if (!result._id) {
      return resFormat.return('Internal server error', 500)
    }

    return resFormat.return(result)
  }
}

module.exports = user
