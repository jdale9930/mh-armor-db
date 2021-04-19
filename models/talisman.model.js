const pool = require("../config/mysql.conf")
const {v4: uuidv4} = require(`uuid`)

async function add(res, talisman)
{
    try{
        let [talismanCheck] = await pool.query("SELECT * FROM talismans WHERE user_id = ?", [talisman.user_id])
        const nameCheck = talismanCheck.find(e => e.name === talisman.name)
        if(nameCheck){
            throw ("Talisman with that name already exists!")
        }
        let id = uuidv4()
        await pool.query("INSERT INTO talismans (id, user_id, name, skill1, skill1Value, skill2, skill2Value, slot1, slot2, slot3) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [id, talisman.user_id, talisman.name, talisman.skill1, talisman.skill1Value,
        talisman,skill2, talisman.skill2Value, talisman.slot1, talisman.slot2, talisman.slot3])
        
        return res.send({
            success: true,
            data: "Succesfully created talisman!",
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

async function remove(res, talisman){
    try{
        await pool.query("DELETE FROM talismans WHERE id = ?",[talisman.id])
        return res.send({
            success: true,
            data: "Succesfully deleted talisman!",
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

async function search(res, talisman){
    try{
        talismanName = talisman.name ? `%${talisman.name}%` : "%";
        skill1 = talisman.skill ? `%${talisman.skill}%` : "%";
        skill2 = talisman.skill ? `%${talisman.skill}%` : "%";
        slot1 = talisman.slot ? talisman.slot : 0;
        slot2 = talisman.slot ? talisman.slot : 0;
        slot3 = talisman.slot ? talisman.slot : 0;
        console.log(armorName, skill1, slot1)

        const [results] = await pool.query(
            "SELECT * FROM talismans WHERE talismans.user_id = ? AND talisman.name LIKE ? AND (talismans.skill1 LIKE ? OR talismans.skill2 LIKE ?)",
            [talisman.user_id, talismanName, skill1, skill2])
            console.log(armor)
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