const { required } = require("joi");
const mongoose=require("mongoose");
const passport=require("passport");
const passportlocalMongoose=require("passport-local-mongoose");

const Userschema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
    }
);

Userschema.plugin(passportlocalMongoose);

module.exports=mongoose.model("userlogin",Userschema);
