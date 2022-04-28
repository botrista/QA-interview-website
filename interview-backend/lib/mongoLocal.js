// import userObject from '../data/user.json'
import _ from 'lodash'
const fs = require('fs')

const mongoLocal = {
    async find(user_id) {
        let userObject = fs.readFileSync('./data/user.json')
        let userData = JSON.parse(userObject).find(el => el.id === parseInt(user_id))
        console.log(userData)
        return userData
    },
    async findAll() {
        let userObject = fs.readFileSync('./data/user.json')
        return JSON.parse(userObject)
    },
    async add(data) {
        let userObject = JSON.parse(fs.readFileSync('./data/user.json'))        
        let len = userObject.length
        data.id = len + 1
        userObject.push(data)
        fs.writeFileSync('./data/user.json', JSON.stringify(userObject))

        return userObject
    }
}

module.exports = mongoLocal