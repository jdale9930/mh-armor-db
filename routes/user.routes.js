const express = require("express")
const router = express.Router()
const user = require("../models/user.model")

router.post("/signup", (req,res)=>{
    return user.signup(res, req.body)
})

router.post("/login", (req,res)=>{
    return user.login(res, req.body);
})


module.exports = router