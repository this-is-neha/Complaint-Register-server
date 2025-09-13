require("dotenv").config();

const mongoose=require("mongoose")

console.log("Mongo URL:",process.env.MONGO_DB_URL)

const { MONGO_DB_URL, MONGO_DB_NAME } = process.env;

mongoose.connect(MONGO_DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:MONGO_DB_NAME
   
}).then(()=>{
    console.log("Mongo db connnected successfully...")
})
.catch((err)=>{
console.log("Error while connecting Mongodb")
console.log("Error:",err    )
process.exit(1)
})




