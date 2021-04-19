const express = require("express")
const router = express.Router()
const user = require("../models/talisman.model")

router.post("/create", (req,res)=>{
    return talisman.create(res, req.body)
})

router.post("/delete", (req,res)=>{
    return talisman.delete(res, req.body);
})


module.exports = router