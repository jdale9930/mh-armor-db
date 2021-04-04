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

async function search(res, name, skill, slots, type){
    try{
        console.log(name, skill, slots, type)
        armorName = name ? `%${name}%` : "%";
        skill1 = skill ? `%${skill}%` : "%";
        skill2 = skill ? `%${skill}%` : "%";
        skill3 = skill ? `%${skill}%` : "%";
        skill4 = skill ? `%${skill}%` : "%";
        slots = slots ? slots : 0;
        type = type ? `%${type}%` : "%";
        console.log(armorName, skill1, slots, type)

        const [armor] = await pool.query(
            "SELECT * FROM armor WHERE armor.name LIKE ? AND (armor.skill1 LIKE ? OR armor.skill2 LIKE ? OR armor.skill3 LIKE ? OR armor.skill4 LIKE ?) AND armor.slots >= ? AND armor.type LIKE ?",
            [armorName, skill1, skill2, skill3, skill4, slots, type])
            console.log(armor)
            return res.send({
                success: true,
                data: armor,
                error: null
            })
    }
    catch(err)
    {
        console.log(err)
        return res.send({
            success: false,
            data: null,
            error: err
        })
    } 
}

async function byName(res, name){
    try{
        console.log(name)
        const[armor] = await pool.query("SELECT * FROM armor WHERE armor.name LIKE ?", [`%${name}%`])
        console.log(armor)
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