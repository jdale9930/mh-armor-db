const express = require("express")
const router = express.Router()
const decoration = require("../models/decoration.model")

router.post("/add", (req,res)=>{
    console.log(req.body)
    return decoration.add(res, req.body)
})

router.get("/all", (req, res)=>{
    return decoration.all(res);
})

router.get("/byName/:Name", (req, res)=>{
    return decoration.byName(res, req.params.Name)
})

router.get("/bySkill/:Skill", (req, res)=>{
    return decoration.bySkill(res, req.params.Name)
})

module.exports = router