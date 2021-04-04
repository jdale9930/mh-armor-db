require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 9090
const armorRoutes = require("./routes/armor.routes")
const decorationRoutes = require("./routes/decoration.routes")
const skillsRoutes = require("./routes/decoration.routes")

const bodyParser = require(`body-parser`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/armor", armorRoutes)
app.use("/decoration", decorationRoutes)
app.use("/skills", skillsRoutes)

app.listen(port, ()=> console.log(`Huzzah, we're on port ${port}`))