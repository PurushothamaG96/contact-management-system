const express = require("express")
const router = express.Router()
const contactsModel = require("../Model/contsctsModel")
const {body, validationResult}=require("express-validator")

router.use(express.json())
router.use(express.urlencoded())

router.post("/contacts",body("firstName").isAlphanumeric(),
                        body("lastName").isAlphanumeric(),
                        body("email").isEmail(),
                        body("phone").isMobilePhone(), 
                        async (req, res)=>{
try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else{
        const data = await contactsModel.create(req.body)
        return res.status(201).json(
            data
        )
    }
     
    
    

}catch(e){
    res.status(500).json({
        status:"failuer",
        message:e.message
    })
}
})

router.get("/contacts", async (req, res)=>{
    try{
        const data = await contactsModel.find()
        return res.status(200).json(data)

    }catch(e){
        res.status(500).json({
            status:"failuer",
            message:e.message
        }) 
    }
})

router.get("/contacts/:id", async (req, res)=>{
    try{
        
        const data = await contactsModel.find({_id:req.params.id})
        if(data){
            return res.status(200).json(data)
        }
        

    }catch(e){
        res.status(404).json({
            error: "There is no contact with that id"
        }) 
    }
})

router.delete("/contacts/:id", async (req, res)=>{
    try{
        
        const data = await contactsModel.deleteOne({_id:req.params.id})
        if(data){
            return res.status(204).json()
        }
        

    }catch(e){
        return res.status(204).json()
    }
})

router.put("/contacts/:id", async (req, res)=>{
    try{
        const updates = req.body
        const data = await contactsModel.findByIdAndUpdate(req.params.id, updates)
        if(data){
            return res.status(204).json(data)
        }
        

    }catch(e){
        return res.status(404).json({
            error: "There is no contact with that id"
            }
            )
    }
})

router.patch("/contacts/:id", async (req, res)=>{
    try{
        const updates = req.body
        const data = await contactsModel.findByIdAndUpdate(req.params.id, updates)
        if(data){
            return res.status(204).json(data)
        }
        

    }catch(e){
        return res.status(404).json({
            error: "There is no contact with that id"
            }
            )
    }
})


module.exports = router
