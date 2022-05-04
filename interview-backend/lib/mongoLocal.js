// import userObject from '../data/user.json'
import _ from 'lodash'
const fs = require('fs')

const mongoLocal = {
    async find(user_id) {
        let userObject = fs.readFileSync('./data/user.json')
        let userData = JSON.parse(userObject).find(el => el.id === parseInt(user_id))

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
    },
    async update(user_id, payloads) {
        let userObject = JSON.parse(fs.readFileSync('./data/user.json'))        
        userObject.forEach((element, index) => {
            console.log(element.id, user_id)
            if(element.id === parseInt(user_id)) {
                console.log(userObject[index])
                payloads.id = parseInt(user_id)
                userObject[index] = payloads;
            }
        });
        fs.writeFileSync('./data/user.json', JSON.stringify(userObject))

        return userObject
    },
    async delete(user_id) {
        let userObject = fs.readFileSync('./data/user.json')
        let userData = JSON.parse(userObject)
        const index = userData.findIndex(object => {
            return object.id === parseInt(user_id);
          });
        if (index === -1) { return false }
        
        userData.splice(index, 1);
        fs.writeFileSync('./data/user.json', JSON.stringify(userData))
        
        return userData
    }
}

module.exports = mongoLocal