const express = require("express")
const router = express.Router()
const armor = require("../models/armor.model")

router.post("/add", (req,res)=>{
    console.log(req.body)
    return armor.add(res, req.body)
})

module.exports = router