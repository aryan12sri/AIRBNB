const express=require("express");
const router=express.Router({mergeParams:true});
const List=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review=require("../models/review.js")
const {reviewvalidate,isLoggedin,isReviewauthor}=require("../middleware.js");
const reviewcontroller=require("../controllers/review.js");

 //review
router.post("/review",isLoggedin,reviewvalidate,wrapAsync(reviewcontroller.createReview));

//review delete
router.delete("/review/:reviewId",isLoggedin,isReviewauthor,wrapAsync(reviewcontroller.destroyReview))

module.exports=router;




