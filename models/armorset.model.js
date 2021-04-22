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

        console.log(

            ) 

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

// async function search(res, user_id, name, skill, slot){
//     try{
//         talismanName = name ? `%${name}%` : "%";
//         skill1 = skill ? `%${skill}%` : "%";
//         skill2 = skill ? `%${skill}%` : "%";
//         slot1 = slot ? slot : 0;
//         slot2 = slot ? slot : 0;
//         slot3 = slot ? slot : 0;
//         console.log(slot)
//         const [results] = await pool.query(
//             "SELECT * FROM talismans WHERE talismans.user_id = ? AND talismans.name LIKE ? AND (talismans.skill1 LIKE ? OR talismans.skill2 LIKE ?) AND (talismans.slot1 >= ? OR talismans.slot2 >= ? OR talismans.slot3 >= ?)",
//             [user_id, talismanName, skill1, skill2, slot1, slot2, slot3])
//             return res.send({
//                 success: true,
//                 data: results,
//                 error: null
//             })
//     }
//     catch(err)
//     {
//         console.log(err)
//         return res.send({
//             success: false,
//             data: null,
//             error: err
//         })
//     } 
// }
module.exports = {add, remove}