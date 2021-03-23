const pool = require("../config/mysql.conf")

async function add(res, decoration)
{
    try{
        if(decoration.name.length < 1 || decoration.name.length > 64)
        {
            throw "Invalid data provided"
        }

        let [name] =
        await pool.query("SELECT * FROM decorations WHERE decorations.name = ?", [decoration.name])
        
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

async function byName(res, Name){
    try{
        const[decorations] = await pool.query("SELECT * FROM decorations WHERE decorations.name = ?", [Name])
        
        return res.send({
            success: true,
            data: decorations,
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
        const[decorations] = await pool.query("SELECT * FROM decorations WHERE decorations.skill1 = ?", [Skill])
        
        return res.send({
            success: true,
            data: decorations,
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

async function all(res){
    try{
        const[decorations] = await pool.query("SELECT * FROM decorations")

        return res.send({
            success: true,
            data: decorations,
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

module.exports = {add, all, byName}