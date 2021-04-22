const express = require("express")
const router = express.Router()
const decoration = require("../models/decoration.model")

router.post("/add", (req,res)=>{
    return decoration.add(res, req.body)
})

router.get("/search", (req, res)=>{
    return decoration.search(res, req.query.name, req.query.skill)
})

router.get("/all", (req, res)=>{
    return decoration.all(res);
})

router.get("/byName/:Name", (req, res)=>{
    return decoration.byName(res, req.params.Name)
})

router.get("/bySkill/:Skill", (req, res)=>{
    return decoration.bySkill(res, req.params.Skill)
})

module.exports = router