const express = require("express")
const router = express.Router()
const skills = require("../models/skills.model")

router.post("/add", (req,res)=>{
    console.log(req.body)
    return skills.add(res, req.body)
})

router.get("/all", (req, res)=>{
    return skills.all(res);
})

router.get("/byName/:Name", (req, res)=>{
    return skilss.byName(res, req.params.Name)
})


module.exports = router