const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require("path")
const cors = require("cors")
require("dotenv").config()
const app = express()
const serverUtils = require("./utils/serverutils")

mongoose.set("debug", true)
const startApp = () => {
    const PORT = process.env.port || 3000;
    app.use(cookieParser())
    app.use(cors())
    app.use(express.static(path.join(__dirname, "public")))
    const api = require("./api")
    app.use(bodyParser.json())
    app.use("/api", api)

    app.listen(PORT, () => {
        console.log("Server Running at " + PORT)
    })
}

serverUtils.boot(app).then(
    () => {
        console.log("Staring index.js- starting app from last else")
        startApp()
    }
)
