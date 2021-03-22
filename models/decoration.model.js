const pool = require("../config/mysql.conf")

async function add(res, decoration)
{
    try{
        if(decoration.name.length < 1 || decoration.name.length > 64)
        {
            throw "Invalid data provided"
        }

        let [name] =
        await pool.query("SELECT * FROM deocrations WHERE decorations.name = ?", [decoration.name])
        
        if(name.length > 0)
        {
            throw "That decoration is already made!"
        }

        await pool.query("INSERT INTO decorations (name, skill1, skill2, slots) VALUES (?,?,?,?)",
        [decoration.name, decoration.skill1, decoration.skill2, decoration.slots]
        )
        return res.send({
            success: true,
            data: `Successfully added ${decoration.name}`,
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