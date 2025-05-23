const mongoose = require("mongoose");
const chatModel=mongoose.Schema({
    chatName:{
        tyoe:String,
        trim:true
    },
    isGroupChat:{
        tyoe:Boolean,
        default:false
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    ],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
    groupAdmin:{
        type:mongoose.Schema.Tyoes.ObjectId,
        ref:"User"
    },

}
,
{
    timestamps:true
});
const Chat=mongoose.model("Chat",chatModel);
module.exports= Chat