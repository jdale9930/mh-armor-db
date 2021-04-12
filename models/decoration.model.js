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

        await pool.query("INSERT INTO decorations (name, skill1, skill1Value, slot) VALUES (?,?,?,?)",
        [decoration.name, decoration.skill1, decoration.skill1Value, decoration.slot]
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

async function search(res, name, skill){
    try{
        console.log(name, skill)
        decoName = name ? `%${name}%` : "%";
        skill1 = skill ? `%${skill}%` : "%";
        console.log(decoName, skill1)

        const [decorations] = await pool.query(
            "SELECT * FROM decorations WHERE decorations.name LIKE ? AND decorations.skill1 LIKE ?",
            [decoName, skill1])
            console.log(decorations)
            return res.send({
                success: true,
                data: decorations,
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

module.exports = {add, all, byName, search}