const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const {Restaurant,Users} = require('./schema.cjs')

const app = express()
app.use(bodyParser.json())

const connectToDb=async function connectToDb(){
    try{
      await mongoose.connect('mongodb+srv://santhosh78:santhoshbalaji78@cluster0.o5spa5d.mongodb.net/Swiggy?retryWrites=true&w=majority')
      const port=8000
      app.listen(port, function(){
    console.log(`Listening on port ${port}...`)
    })
    }catch(error){
        console.log(error)
        console.log("fail to connect")
    }
}
connectToDb()

app.post('/add-restaurants',async function(request,response){
  try{
    await Restaurant.create({
        "areaName":request.body.areaName,
        "avgRating":request.body.avgRating,
        "costFortwo":request.body.costFortwo,
        "cuisines":request.body.cuisines,
        "name":request.body.name
    })
      response.status(201).json({
        "status":"success",
        "message":"restaurants added"
      })

  }catch(error){
    response.status(500).json({
        "status" : "failure",
        "message" : "internal server error"
    })
  }
})

app.get('/get-restaurants-details',async function(request,response){
    try{
        const RestaurantDetails=await Restaurant.find()
        response.status(200).json(RestaurantDetails)
    }catch(error)
    {
         response.status(500).json({
            "status":"failure",
            "message":"could not fetch",
            "error":"error"
         })
    }
})

app.delete('/delete-restaurant-detail/:id',async function(request,response){
  try{
    await  Restaurant.findByIdAndDelete(request.params.id)
    response.status(201).json({
      "status":"success"
    })
  }catch(error){
    response.status(500).json({
      "status":"failure",
      "message":"could not fetch",
      "error":"error"
    })
  }
})