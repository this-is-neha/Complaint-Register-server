const chatRoute = require("express").Router();
const chats=require("./messgae.dto")


chatRoute.get("/chat",(req,res)=>{
    res.send(chats)
})

chatRoute.get("/chat:id",(req,res)=>{
    const singleChat=chats.find((c)=>{
const singleChat=chats.find((c)=>c._id ===req.params.id);
res.send(singleChat)
    })
})




module.exports =chatRoute