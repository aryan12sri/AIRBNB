const express=require("express");
const router=express.Router();
const userlogin=require("../models/user");
const passport=require("passport");
const {Redirecturl,isOwner} = require("../middleware");
const usercontroller=require("../controllers/user");

router
 .route("/signup")
  .get(usercontroller.renderSignupform)
  .post(usercontroller.signup);

router
 .route("/login")
  .get(usercontroller.renderloginform)
  .post(Redirecturl,
  passport.authenticate("local", {  
    failureRedirect: "/login",
    failureFlash: "Invalid username or password",
  }),
 usercontroller.login
);

router.get("/logout",usercontroller.logout);
 
module.exports=router;