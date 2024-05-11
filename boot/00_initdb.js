const mongoose = require("mongoose")
const config = require("../config")
const Promise = require("bluebird")
const users = require("../modules/users/model")

module.exports = (app) =>{
    new Promise(async(resolve, reject)=>{
        console.log("boot script - Starting initDb");
        try {
           mongoose.connect(config.mongo.url,{autoIndex: true})
        }
        catch(err) {
            reject(err)
        }
        // default scripts should come here
        const user = {
            username: "admin@gmail.com",
            email: "admin@gmail.com",
            password: "admin",
            name: "admin"
        }
        const userExists = await users.findOne({email: user.email})
        if (userExists) {
            resolve()
        }
        else {
            const newUser = new users(user)
            await newUser.save()
        }
        resolve()
    })
}