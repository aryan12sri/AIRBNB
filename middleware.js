const List=require("./models/listing.js");
const  {schemalist,Schemareview}=require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review=require("./models/review.js")


module.exports.isLoggedin=(req,res,next)=>{ 
  if(!req.isAuthenticated()){     
    req.session.currurl=req.originalUrl;
    req.flash("error","you need to be logged in");
    return res.redirect(`/login`);
  }
  next();
}

module.exports.Redirecturl=(req,res,next)=>{
   if(req.session.currurl){
     res.locals.currurl=req.session.currurl;
   }
   next();
}

module.exports.isOwner=async (req,res,next)=>{
  let id=req.params.id;
  let result=await List.findById(id);
  if(!result.owner._id.equals(res.locals.curruser._id)){
    req.flash("error","you are not the owner")
   return res.redirect(`/listing/${id}`);
  }
  next();
}
  
module.exports.isReviewauthor=async (req,res,next)=>{
  let {id,reviewId}=req.params;
  let result=await Review.findById(reviewId);
  if(!result.author._id.equals(res.locals.curruser._id)){
    req.flash("error","you are not the author of review")
    return res.redirect(`/listing/${id}`);
  }
  next();
}

module.exports.uservalidate=(req,res,next)=>{
  let {error}=schemalist.validate(req.body);
  if (error) {
    let errmsg=error
    throw new ExpressError(400,errmsg)  
  }else{
    next();
  }
}

module.exports.reviewvalidate=(req,res,next)=>{
    let {error}=Schemareview.validate(req.body);
    if (error) {
        let errmsg=error
        throw new ExpressError(400,errmsg)  
    }else{
        next();
    }
}
