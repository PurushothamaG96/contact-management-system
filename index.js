const express = require("express")
const app =express()
const mongoose = require("mongoose")
const constactsRouter = require("./Router/contactRouter")
const port = 5500

function main(){
    mongoose.connect("mongodb://localhost/contacts")
    .then((res)=>{
        console.log("mongodb connected")
    }).catch((e)=>{
        console.log(e)
    })
}
main()

app.use("/v1", constactsRouter)

app.get("/v1", (req, res)=>{
    res.send("ok from app")
})

app.listen(port, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("server is up at", port)
    }
})