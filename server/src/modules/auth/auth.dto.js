const Joi=require("joi")

    const registerDTO=Joi.object({
    name:Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password:Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).min(8).max(25).required(),
    confirmPassword:Joi.string().valid(Joi.ref('password')).required(),
    role:Joi.string().pattern(/^(user|admin)$/),
    image:Joi.string(), 
    phone:Joi.number(),
    gender:Joi.string().pattern(/^(male|female)$/),
    address:Joi.string().min(2).max(14).required(),
    houseNo:Joi.string().required(),
    toleName:Joi.string().required(),
    occupation:Joi.string().required(),
    birthdate:Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/)
 
})

    const loginDTO=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })

     
    module.exports={registerDTO,loginDTO}