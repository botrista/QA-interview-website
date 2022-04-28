import express from 'express'
import auth from '../lib/auth'
import errorHandler from '../lib/errorHandler'
import user from '../model/user'
import resFormat from '../lib/resFormat'

const router = express.Router()

router.get('/:user_id', errorHandler(async (req, res) => {
    
    const result = await user.getUser(req.params.user_id).catch(err => {
        console.log(err)
        return res.status(500).send(resFormat.return('Internal server error', 500))
    })
    
    if (result.status) {    
        res.status(200).send(resFormat.return(result.data))
    } else {
        res.status(400).send(resFormat.return(result.message, 400))
    }
}))

router.get('/', errorHandler(async (req, res) => {
    
    const result = await user.get().catch(err => {
        console.log(err)
        return res.status(500).send(resFormat.return('Internal server error', 500))
    })

    if (result.status) {
        res.status(200).send(resFormat.return(result.data))
    } else {
        res.status(400).send(resFormat.return(result.message, 400))
    }
}))



router.post('/', errorHandler(async (req, res) => {
        
    const result = await user.post(req.body).catch(err => {
        console.log(err)
        return res.status(500).send(resFormat.return('Internal server error', 500))
    })

    if (result.status) {
        res.status(200).send(resFormat.return(result.data))
    } else {
        res.status(400).send(resFormat.return(result.message, 400))
    }
}))

router.post('/login', auth.verify, errorHandler(async (req, res) => {
    const result = await user.login(req.body).catch(err => {
        console.log(err)
        return res.status(500).send(resFormat.return('Internal server error', 500))
    })

    if (result.status) {
        res.status(200).send(resFormat.return(result.data))
    } else {
        res.status(400).send(resFormat.return(result.message, 400))
    }
}))

module.exports = router