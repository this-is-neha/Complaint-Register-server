const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true

    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "customer"
    },
    activationToken: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    gender:
    {type:String,
        required:true
    }
        ,
    phone: String,
    image: String,
    address: String,
    houseNo:{
        type:String,
        required:true
    },
    toleName:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    // birthdate:{
    //     type:String,
    // required:true},
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },

    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }


},
    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true
    }
)





const UserModel = mongoose.model("User", UserSchema

)
module.exports = UserModel;
