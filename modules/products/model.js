const mongoose = require("mongoose")

const scheme = new mongoose.Schema({
    name : {
        type: String,
    },
    price : {
        type : String,
    },
    catogery : {
        type: String
    },
    status : {
        type : Boolean
    }
},{
    timestamps : true,
    versionKey: false,
    strict:false
})

scheme.set("toJSON", {
    virtuals: true,
});

scheme.set("toObject", {
    virtuals: true,
});
module.exports = mongoose.model("products",scheme)