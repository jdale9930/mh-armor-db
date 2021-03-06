require("dotenv").config()
const express = require("express")
const session = require("express-session")
const app = express()
app.use(express.static(__dirname + "/build"));

app.use(session({secret: "It's a secret", resave: false, saveUninitialized: true}))

const port = process.env.PORT || 8080
const armorRoutes = require("./routes/armor.routes")
const decorationRoutes = require("./routes/decoration.routes")
const skillsRoutes = require("./routes/skills.routes")
const userRoutes = require("./routes/user.routes")
const talismanRoutes = require("./routes/talisman.routes")
const armorsetRoutes = require("./routes/armorset.routes")

const bodyParser = require(`body-parser`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/armor", armorRoutes)
app.use("/decoration", decorationRoutes)
app.use("/skills", skillsRoutes)
app.use("/user", userRoutes)
app.use("/talisman", talismanRoutes)
app.use("/armorset", armorsetRoutes)

app.get("*", (req, res) => {
    res.sendFile("/build/index.html", { root: __dirname + "/" });
  });

app.listen(port, ()=> console.log(`Huzzah, we're on port ${port}`))