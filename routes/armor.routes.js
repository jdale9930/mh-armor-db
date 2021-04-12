const express = require("express")
const router = express.Router()
const armor = require("../models/armor.model")

router.post("/add", (req,res)=>{
    console.log(req.body)
    return armor.add(res, req.body)
})

router.get("/all", (req, res)=>{
    return armor.all(res);
})


router.get("/search", (req, res)=>{
    return armor.search(res, req.query.name, req.query.skill, req.query.piece)
})

router.get("/bySkill/:skill", (req, res)=>{
    return armor.bySkill(res, req.params.skill)
})

router.get("/bySlots/:Slots", (req, res)=>{
    return armor.bySlots(res, req.params.Slots)
})

router.get("/byType/:Type", (req, res)=>{
    return armor.byType(res, req.params.Type)
})

router.get("/byClass/:Class", (req, res)=>{
    return armor.byClass(res, req.params.Class)
})
module.exports = router