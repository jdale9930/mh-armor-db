const express = require("express")
const router = express.Router()
const armorset = require("../models/armorset.model")

router.post("/add", (req,res)=>{
    return armorset.add(res, req.body)
})

router.post("/remove", (req,res)=>{
    return armorset.remove(res, req.body);
})

router.get("/search", (req, res)=>{
    return armorset.search(res, req.query.id, req.query.name, req.query.skill, req.query.slots)
})


module.exports = router