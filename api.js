const express = require("express")
const router = express.Router()
// Middelware can imported if required

const handler = {
    products : {
        path : require("./modules/products")
    },
    users : {
        path : require("./modules/users")
    }
}

for (let m in handler) {
    router.use("/" + m, handler[m].path)
}

router.get("*",(req,res)=>{
    res.status.send({
        message : "Not Found"
    })
})


module.exports = router;