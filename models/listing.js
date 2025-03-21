
const mongoose=require("mongoose");
const { type } = require("../schema");
const review = require("./review");
const userlogin= require("./user");


const userschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
      type:String,
    },

    image:{
      url:String,
      filename:String
    },

    price:{
       type:Number,
    },

    location:{
        type:String,
    }, 

    country:{
        type:String,
    },

    review:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"review"
    }],
    
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"userlogin"
    },
    
    geometry:{
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
 

})

userschema.post("findOneAndDelete",async(oneList)=>{
    let res=await review.deleteMany({_id:{$in:oneList.review}});
})


module.exports=mongoose.model("User",userschema);

