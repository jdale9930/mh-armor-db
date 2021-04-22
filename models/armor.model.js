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
        await pool.query("INSERT INTO armor (name, piece, armorSet, gender, rarity, slot1, slot2, slot3, skill1, skill1Value, skill2, skill2Value, skill3, skill3Value, skill4, skill4Value, defense, fireRes, waterRes, thunderRes, iceRes, dragonRes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [armor.name, armor.piece, armor.armorSet, armor.gender, armor.rarity, 
        armor.slot1, armor.slot2, armor.slot3,
        armor.skill1, armor.skill1Value, armor.skill2, armor.skill2Value, armor.skill3, armor.skill4Value, armor.skill4, armor.skill4Value,
        armor.defense, armor.fireRes, armor.waterRes, armor.thunderRes, armor.iceRes, armor.dragonRes,
        ])
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

async function search(res, name, skill, slots, piece){
    try{
        armorName = name ? `%${name}%` : "%";
        skill1 = skill ? `%${skill}%` : "%";
        skill2 = skill ? `%${skill}%` : "%";
        skill3 = skill ? `%${skill}%` : "%";
        skill4 = skill ? `%${skill}%` : "%";
        slots = slots ? slots : 0;
        piece = piece ? `%${piece}%` : "%";
        // console.log(armorName, skill1, slots, piece)

        const [armor] = await pool.query(
            "SELECT * FROM armor WHERE armor.name LIKE ? AND (armor.skill1 LIKE ? OR armor.skill2 LIKE ? OR armor.skill3 LIKE ? OR armor.skill4 LIKE ?) AND armor.piece LIKE ?",
            [armorName, skill1, skill2, skill3, skill4, piece])
            // console.log(armor)
            return res.send({
                success: true,
                data: armor,
                error: null
            })
    }
    catch(err)
    {
        return res.send({
            success: false,
            data: null,
            error: err
        })
    } 
}

async function byName(res, name){
    try{
        const[armor] = await pool.query("SELECT * FROM armor WHERE armor.name LIKE ?", [`%${name}%`])
        return res.send({
            success: true,
            data: armor,
            error: null
        })
    }
    catch(err){
        console.log(err)
        return res.send({
            
            success: false,
            data: null,
            error: err
        })
    }
};

async function bySkill(res, Skill){
    try{
        const[armor] = await pool.query("SELECT * FROM armor WHERE armor.skill1 LIKE ? OR armor.skill2 LIKE ? OR armor.skill3 LIKE ? OR armor.skill4 LIKE ?", 
        [`%${Skill}%`, `%${Skill}%`, `%${Skill}%`, `%${Skill}%`])
        
        return res.send({
            success: true,
            data: armor,
            error: null
        })
    }
    catch(err){
        console.log(err)
        return res.send({
            
            success: false,
            data: null,
            error: err
        })
    }
};

async function bySlots(res, Slots){
    try{
        const[armor] = await pool.query("SELECT * FROM armor WHERE slots >= ?", [Slots])
        
        return res.send({
            success: true,
            data: armor,
            error: null
        })
    }
    catch(err){
        console.log(err)
        return res.send({
            
            success: false,
            data: null,
            error: err
        })
    }
};

async function byType(res, Type){
    try{
        const[armor] = await pool.query("SELECT * FROM armor WHERE type = ?", [Type])
        
        return res.send({
            success: true,
            data: armor,
            error: null
        })
    }
    catch(err){
        console.log(err)
        return res.send({
            
            success: false,
            data: null,
            error: err
        })
    }
};

async function byClass(res, Class){
    try{
        const[armor] = await pool.query("SELECT * FROM armor WHERE class = ?", [Class])
        
        return res.send({
            success: true,
            data: armor,
            error: null
        })
    }
    catch(err){
        console.log(err)
        return res.send({
            
            success: false,
            data: null,
            error: err
        })
    }
};



module.exports = {add, byName, bySkill, bySlots, byType, byClass, search}