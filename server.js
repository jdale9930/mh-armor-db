require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 9090
const passport = require("./config/passport.conf")
//const session = require("express-session")
const bodyParser = require(`body-parser`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, ()=> console.log(`Huzzah, we're on port ${port}`))