
const mongoose=require("mongoose");
const userlogin= require("./user");

const reviewschema=new mongoose.Schema({
    
    rating:{
        type:Number,
        min:1,
        max:5
    },

    comment:String,

    createdAt:{
       type:Date,
       default:Date.now()
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userlogin"
    }
})



module.exports=mongoose .model("review",reviewschema);