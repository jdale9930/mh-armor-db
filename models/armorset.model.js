const pool = require("../config/mysql.conf")
const {v4: uuidv4} = require(`uuid`)

async function add(res, armorset)
{
    try{
        let [armorsetCheck] = await pool.query("SELECT * FROM armorset WHERE user_id = ?", [armorset.user_id])
        const nameCheck = armorsetCheck.find(e => e.name === armorset.name)
        if(nameCheck){
            throw ("Armor Set with that name already exists!")
        }
        let id = uuidv4()

        await pool.query("INSERT INTO armorset (id, user_id, name, weapon, description, defense, fireRes, waterRes, thunderRes, iceRes, dragonRes, head, torso, arms, waist, legs, talisman_id,  skill1, skill1Value, skill2, skill2Value, skill3, skill3Value, skill4, skill4Value, skill5, skill5Value, skill6, skill6Value, skill7, skill7Value, skill8, skill8Value, skill9, skill9Value, skill10, skill10Value, skill11, skill11Value, skill12, skill12Value, skill13, skill13Value, skill14, skill14Value, skill15, skill15Value, skill16, skill16Value, headSlot1, headSlot2, headSlot3, torsoSlot1, torsoSlot2, torsoSlot3, armsSlot1, armsSlot2, armsSlot3, waistSlot1, waistSlot2, waistSlot3, legsSlot1, legsSlot2, legsSlot3, talismanSlot1, talismanSlot2, talismanSlot3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        ,[id, armorset.user_id, armorset.name, armorset.weapon, armorset.description, 
            armorset.defense, armorset.fireRes, armorset.waterRes, armorset.thunderRes, armorset.iceRes, armorset.dragonRes,
            armorset.head, armorset.torso, armorset.arms, armorset.waist, armorset.legs, armorset.talisman_id,
            armorset.skill1, armorset.skill1Value, armorset.skill2, armorset.skill2Value, armorset.skill3, armorset.skill3Value,
            armorset.skill4, armorset.skill4Value, armorset.skill5, armorset.skill5Value, armorset.skill6, armorset.skill6Value,
            armorset.skill7, armorset.skill7Value, armorset.skill8, armorset.skill8Value, armorset.skill9, armorset.skill9Value,
            armorset.skill10, armorset.skill10.Value, armorset.skill11, armorset.skill11Value, armorset.skill12, armorset.skill12Value,
            armorset.skill13, armorset.skill13Value, armorset.skill14, armorset.skill14Value, armorset.skill15, armorset.skill15Value,
            armorset.skill16, armorset.skill16Value,
            armorset.headSlot1, armorset.headSlot2, armorset.headSlot3,
            armorset.torsoSlot1, armorset.torsoSlot2, armorset.torsoSlot3,
            armorset.armsSlot1, armorset.armsSlot2, armorset.armsSlot3,
            armorset.waistSlot1, armorset.waistSlot2, armorset.waistSlot3,
            armorset.legsSlot1, armorset.legsSlot2, armorset.legsSlot3,
            armorset.talismanSlot1, armorset.talismanSlot2, armorset.talismanSlot3,
        ])
        return res.send({
            success: true,
            data: "Succesfully created Armor Set!",
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

async function remove(res, armorset){
    try{
        await pool.query("DELETE FROM armorset WHERE id = ?",[armorset.id])
        return res.send({
            success: true,
            data: "Succesfully deleted armorset!",
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

async function search(res, user_id, name, skill, weapon){
    try{
        armorsetName = name ? `%${name}%` : "%";
        skill1 = skill ? `%${skill}%` : "%";
        skill2 = skill ? `%${skill}%` : "%";
        skill3 = skill ? `%${skill}%` : "%";
        skill4 = skill ? `%${skill}%` : "%";
        skill5 = skill ? `%${skill}%` : "%";
        skill6 = skill ? `%${skill}%` : "%";
        skill7 = skill ? `%${skill}%` : "%";
        skill8 = skill ? `%${skill}%` : "%";
        skill9 = skill ? `%${skill}%` : "%";
        skill10 = skill ? `%${skill}%` : "%";
        skill11 = skill ? `%${skill}%` : "%";
        skill12 = skill ? `%${skill}%` : "%";
        skill13 = skill ? `%${skill}%` : "%";
        skill14 = skill ? `%${skill}%` : "%";
        skill15 = skill ? `%${skill}%` : "%";
        skill16 = skill ? `%${skill}%` : "%";
        weaponSet = weapon ? `%${weapon}%` : "%";
        const [results] = await pool.query(
            "SELECT * FROM armorset WHERE armorset.user_id = ? AND armorset.name LIKE ? AND (armorset.skill1 LIKE ? OR armorset.skill2 LIKE ? OR armorset.skill3 LIKE ? OR armorset.skill4 LIKE ? OR armorset.skill5 LIKE ? OR armorset.skill6 LIKE ? OR armorset.skill7 LIKE ? OR armorset.skill8 LIKE ? OR armorset.skill9 LIKE ? OR armorset.skill10 LIKE ? OR armorset.skill11 LIKE ? OR armorset.skill12 LIKE ? OR armorset.skill13 LIKE ? OR armorset.skill14 LIKE ? OR armorset.skill15 LIKE ? OR armorset.skill16 LIKE ?) AND armorset.weapon LIKE ?",
            [user_id, armorsetName, skill1, skill2, skill3, skill4, skill5, skill6, skill7, 
                skill8, skill9, skill10, skill11, skill12, skill13, skill14, skill15, skill16, weaponSet])
            return res.send({
                success: true,
                data: results,
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
module.exports = {add, remove, search}