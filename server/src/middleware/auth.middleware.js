require("dotenv").config()
const jwt=require("jsonwebtoken")
const authSvc=require("../modules/auth/auth.service")

const auth=async(req,res,next)=>{
    try{
let token =req.headers['authorization'] ||null; 
if(!token)  {
    next({
        code:401,
        messgae:"Token/Access code required"
    })
}  
token =token.split(" ").pop()
const tokenData=jwt.verify(token,process.env.JWT_SECRET)
const userDetail= await authSvc.findOneUser({
    _id:tokenData.sub

})
if(!userDetail){
     next({
         code:401,
         message:"User does not exist anymore"
     })
 }

req.authUser=userDetail;
next()

}
    catch(exception){
        console.log("Exception",exception)
        next({
            code:401,
            messgae:"Unauthorized Access"

        })
    }
}


module.exports =  auth;