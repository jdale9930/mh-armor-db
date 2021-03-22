const express = require("express")
const router = express.Router()
const decoration = require("../models/decoration.model")

router.post("/add", (req,res)=>{
    console.log(req.body)
    return decoration.add(res, req.body)
})

module.exports = router