const express = require("express")
const router = express.Router()
const user = require("../models/user.model")

router.post("/signup", (req,res)=>{
    console.log(req.body)
    return skills.add(res, req.body)
})

router.get("/login", (req, res)=>{
    return user.login(res, req.body);
})


module.exports = router