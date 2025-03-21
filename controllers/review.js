const List=require("../models/listing.js");
const Review=require("../models/review.js");

module.exports.createReview=async(req,res )=>{
    let id =req.params.id;
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    let listing=await List.findById(id);
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Review is added");
    res.redirect(`/listing/${req.params.id}`);
};

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await List.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review is Deleted");
    res.redirect(`/listing/${id}`);
};


