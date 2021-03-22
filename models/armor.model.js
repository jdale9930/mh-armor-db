const pool = require("../config/mysql.conf")

async function add(res, armor)
{
    try{
        if(armor.name.length < 1 || armor.name.length > 64)
        {
            throw "Invalid data provided"
        }

        let [name] =
        await pool.query("SELECT * FROM armor WHERE armor.name = ?", [armor.name])
        
        if(name.length > 0)
        {
            throw "That armor is already made!"
        }

        await pool.query("INSERT INTO armor (name, class, type, gender, skill1, skill2, skill3, skill4, defense, fireRes, waterRes, thunderRes, iceRes, dragonRes, slots, rarity) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [armor.name, armor.class, armor.type, armor.gender, armor.skill1, armor.skill2, armor.skill3, armor.skill4,
        armor.defense, armor.fireRes, armor.waterRes, armor.thunderRes, armor.iceRes, armor.dragonRes,
        armor.slots, armor.rarity]
        )
        return res.send({
            success: true,
            data: `Successfully added ${armor.name}`,
            error: null
        })
    }
    catch(err){
        return res.send({
            success: false,
            data: null,
            error: err
        })
    }
}

module.exports = {add}