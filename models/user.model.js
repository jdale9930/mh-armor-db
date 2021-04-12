const pool = require("../config/mysql.conf")
const bcrypt = require("bcrypt")
import {v4 as uuidv4} from "uuid"
const saltRounds = 12

async function signup(res, user){
    try{
        if(user.username.length < 4 || user.username.length > 16){
            throw "Username must be between 4 to 16 characters!"
        }

        if(user.password.length <8 || user.password.length > 20){
            throw "Password must be between 8 to 20 characters!"
        }

        let nameCheck = await pool.query("SELECT * FROM users WHERE users.username = ?", [user.username])
        if(nameCheck.length > 0){
            throw `The username ${user.username} is already taken!`
        }
        let user_id = uuidv4()
        let hash = bcrypt.hashSync(user.password, saltRounds)
        await pool.query("INSERT INTO users (username, password, user_id) VALUES (?,?,?)", [user.username, hash, user_id])
        return res.send({
            success: true,
            data: "Succesfully created account!",
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
        let userCheck = await pool.query("GET * FROM users WHERE users.username = ?",[user.username])
        if(userCheck.length === 0){
            throw "Incorrect username"
        }
        let compare = bcrypt.compareSync(user.password, userCheck.password)
        if(compare === false){
            throw "Incorrect password"
        }
        return res.send({
            success: true,
            data: user,
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