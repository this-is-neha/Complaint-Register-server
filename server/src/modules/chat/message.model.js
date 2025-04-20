const mongoose=require("mongoose");
const messageModel=mongoose.Schema({
sender:{
    type:mongoose.Schema.tyoes.ObjectId, 
    ref:"User",
},
content:{type:String,trim:true

}, chat:{type:mongoose.Schema.Types.ObjectId,
    ref:"Chat"
}

},{
    timestamps:true
});

const Messgae=mongoose.model("Message",messageModel)
module.exports=Message;