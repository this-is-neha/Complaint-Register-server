
const authRoute = require("express").Router();
const authCtrl=require("./auth.controller");
const{bodyValidator}=require('../../middleware/validator.middleware')
const {registerDTO,loginDTO}=require("./auth.dto")
const {setPath,uploader}=require("../../middleware/uploader.middleware")
const auth=require("../../middleware/auth.middleware")
const allowRole=require("../../middleware/rbac.middleware")

authRoute.post('/register',setPath('users'),uploader.single('image'), bodyValidator(registerDTO), authCtrl.register)

authRoute.get("/activate/:token",authCtrl.activate)
authRoute.post('/login',bodyValidator(loginDTO), authCtrl.login)
authRoute.post("/reset",auth,authCtrl.forgotPassword)
authRoute.put("/reset-password",auth,authCtrl.changePassword)
authRoute.get("/resettok/:token",authCtrl.checkResetToken)
authRoute.get("/me",auth,authCtrl.getLoggedIn)
authRoute.get("/:id",auth,authCtrl.getUserById)
authRoute.get("/admin",auth,allowRole(['admin','user']),authCtrl.adminAccess)

module.exports = authRoute