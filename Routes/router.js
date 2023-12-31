
const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");
const addPassword = require("../models/addPassword");




// Routes
router.post("/user/register",controllers.userregister);
router.post("/user/sendotp",controllers.userOtpSend);
router.post("/user/login",controllers.userLogin);



router.post("/dashboard",async(req,res)=>{
    
    const {Website,Username,Password} = req.body;

    if(!Website || !Username || !Password){
        res.status(400).json("please fill the data");
    }

    try {
        
        const preuser = await addPassword.findOne({Website:Website});
        console.log(preuser);

        if(preuser){
            res.status(400).json("this  user is already present");
        }else{
            const adduser = new addPassword({
                Website,Username,Password
            });

            await adduser.save();
            res.status(200).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(400).json(error);
    }
})






router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await addPassword.find();
        res.status(200).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await addPassword.findById({_id:id});
        console.log(userindividual);
        res.status(200).json(userindividual)

    } catch (error) {
        res.status(400).json(error);
    }
})


router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await addPassword.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(200).json(updateduser);

    } catch (error) {
        res.status(400).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await addPassword.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(200).json(deletuser);

    } catch (error) {
        res.status(400).json(error);
    }
})






module.exports = router;