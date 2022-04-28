import express from 'express'
import apiV1 from '../controllers/ApiRoute1'
import user from '../controllers/user'

const router = express.Router()

router.use(apiV1)
// router.use('/v2', apiV2)

/* GET home page. */
router.get('/', (req, res) => {
    res.send()
})

/* Import user controller. */
router.use('/user', user)


module.exports = router
