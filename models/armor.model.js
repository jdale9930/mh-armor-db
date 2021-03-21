const pool = require("../config/mysql.conf")

async function add(res, armor)
{
    try{
        if(armor.name.length < 1 || armor.name.length > 64)
        {
            throw "Invalid data provided"
        }

        await poolquery("INSERT INTO armor(name, type, gender, skill1, skill2, skill3, skill4, fireRes, waterRes, thunderRes, iceRes, dragonRes, slots, rarity) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?",
        [armor.name, armor.type, armor.gender, armor.skill1, armor.skill2, armor.skill3, armor.skill4,
        armor.fireRes, armor.waterRes, armor.thunderRes, armor.iceRes, armor.dragonRes,
        armor.slots, armor.rarity]
        )
    }
    catch(err){
        return res.send({
            success: false,
            data: null,
            error: err
        })
    }
}