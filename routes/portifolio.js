const router = require('express').Router();
const Portifolio = require('../models/portifolio')


router.get('/', async (req, res) => { 
    try {
        let senders = await Portifolio.find();
        res.json({
            status: 'Success',
            senders
        })
    }
    catch (err) {
        res.json({
            status: 'Error',
            message: err.message
        })
    }
})

router.post('/',async  (req, res) => { 

    try {
        if (!req.body) {
            res.status(400).json({
                message: "Missing Credentials"
            })
        }
        let newMess = await Portifolio.create(req.body);
        res.json({
            newMess
        })
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
})
module.exports = router;