const express = require("express")
const router = express.Router()
const talisman = require("../models/talisman.model")

router.post("/add", (req,res)=>{
    return talisman.add(res, req.body)
})

router.post("/remove", (req,res)=>{
    return talisman.remove(res, req.body);
})

router.get("/search", (req, res)=>{
    return talisman.search(res, req.body.user_id, req.query.name, req.query.skill)
})


module.exports = router