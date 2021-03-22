require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 9090
const armorRoutes = require("./routes/armor.routes")

const bodyParser = require(`body-parser`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/armor", armorRoutes)

app.listen(port, ()=> console.log(`Huzzah, we're on port ${port}`))