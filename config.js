module.exports = {
    mongo :{
        url: process.env.mongoose
    },
    saltRounds:10,
    jwtSecret: process.env.jwtSecret,
}