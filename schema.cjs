const mongoose = require('mongoose')
const restaurantsSchema = new mongoose.Schema({
    areaName :{
        type:String
    },
    avgRating :{
        type: Number
    },
    costFortwo :{
        type: String
    },
    cuisines :{
        type: Array
    },
    name :{
        type: String
    }
})

const Restaurant = mongoose.model('userdetails',restaurantsSchema)
module.exports={Restaurant}


