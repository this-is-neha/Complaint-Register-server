const asyncHandler=require("express-async-handler");
const Chat=require("./chat.model")

const accessChat=asyncHandler(async(req,res)=>{
    const {userId}=req.body;
    if(!userId){
console.log("UserId param not sent with request ");
return res.sendStatus(400);
    }

    varisChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elenMatch:{$eq:req.user._id}}},
            {users:{$elenMatch:{$eq:userId}}},
        ]

    }).populate("users","password")
    .populate("latestMessage");



   ChatOld=await User.populate(ChatOld,{
        path:"latestMessage.sender",
        select:"name pic email",

    });
    if(ChatOld.length>0){
res.send(ChatOld[0]);

    }
    else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id, userId]
        };
        try{
            const createdChat=await Chat.create(chatData);
            const FullChat=await Chat.findOne({_id: createdChat._id}).populate( 
                "users",
                "password"
            );
            res.status=200
        }
        catch(error){

        }
    }
});