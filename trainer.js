const express = require('express')
const router = express.Router()

router.get('/trainerIndex',(req,res)=>{
    res.render('trainerIndex')
})

module.exports = router;