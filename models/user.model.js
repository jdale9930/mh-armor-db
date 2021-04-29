const pool = require("../config/mysql.conf")
const bcrypt = require("bcrypt")
const {v4: uuidv4} = require(`uuid`)
const saltRounds = 12

async function signup(res, user, req){
    try{
        console.log("Pls")
        if(user.username.length < 4 || user.username.length > 16){
            throw "Username must be between 4 to 16 characters!"
        }

        if(user.password.length <8 || user.password.length > 20){
            throw "Password must be between 8 to 20 characters!"
        }
        let [nameCheck] = await pool.query("SELECT * FROM users WHERE users.username = ?", [user.username])
        if(nameCheck.length > 0){
            throw `The username ${user.username} is already taken!`
        }
        let user_id = uuidv4()
        let hash = bcrypt.hashSync(user.password, saltRounds)
        await pool.query("INSERT INTO users (username, password, user_id) VALUES (?,?,?)", [user.username, hash, user_id])
        return res.send({
            success: true,
            data: {username: user.username, user_id: user_id},
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

async function login(res, user){
    try{
        let [userCheck] = await pool.query("SELECT * FROM users WHERE users.username = ?",[user.username])
        if(userCheck.length === 0){
            throw "Incorrect username or password"
        }
        let compare = bcrypt.compareSync(user.password, userCheck[0].password)
        if(compare === false){
            throw "Incorrect password or password"
        }
        return res.send({
            success: true,
            data: userCheck[0],
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



module.exports = {signup, login}