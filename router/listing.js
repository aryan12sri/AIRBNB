const express=require("express");
const router=express.Router();
const List=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedin,isOwner,uservalidate}=require("../middleware.js");
const listingcontroller=require("../controllers/listing.js");
const multer  = require('multer'); 
const {storage}=require("../configure.js");
const upload = multer({storage});


//Index and Create
router
 .route("/")
  .get(listingcontroller.index)
  .post(isLoggedin,upload.single('list[image]'),uservalidate,listingcontroller.createList)
 

router.get("/new",isLoggedin,listingcontroller.newRender);

router
 .route("/:id")
  .get(listingcontroller.showlist)
  .put(isLoggedin,isOwner,upload.single('list[image]'),uservalidate,listingcontroller.editlist)
  .delete(isLoggedin,isOwner,listingcontroller.destorylist)

router.get("/:id/edit",isLoggedin,isOwner,listingcontroller.editRender);
                                                                                                                                 

module.exports=router;