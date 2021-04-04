const pool = require("../config/mysql.conf")

async function add(res, skill)
{
    try{
        if(skill.name.length < 1 || skill.name.length > 64)
        {
            throw "Invalid data provided"
        }

        let [name] =
        await pool.query("SELECT * FROM skills WHERE skills.name = ?", [skill.name])
        
        if(name.length > 0)
        {
            throw "That skill is already made!"
        }

        await pool.query("INSERT INTO skills (name, description, levels, level1Desc, level2Desc, level3Desc, level4Desc, level5Desc, level6Desc, level7Desc) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [skill.name, skill.description, skill.levels, 
            skill.level1Desc, skill.level2Desc, skill.level3Desc, 
            skill.level4Desc, skill.level5Desc, skill.level6Desc, 
            skill.level7Desc]
        )
        return res.send({
            success: true,
            data: `Successfully added ${skill.name}`,
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
        const[skills] = await pool.query("SELECT * FROM skills WHERE skills.name = ?", [Name])
        
        return res.send({
            success: true,
            data: skills,
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
        const[skills] = await pool.query("SELECT * FROM skills")

        return res.send({
            success: true,
            data: skills,
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