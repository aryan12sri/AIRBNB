const List=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
let MY_ACCESS_TOKEN=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: MY_ACCESS_TOKEN });

module.exports.index=wrapAsync(async (req,res)=>{ 
    const allList=await List.find();
    res.render("listings/index.ejs",{ allList })
})

module.exports.newRender=wrapAsync(async (req,res)=>{
    res.render("listings/new.ejs");
})

module.exports.editRender=wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let list=await List.findById(id);
    originalImage=list.image.url;
    originalImage=originalImage.replace("/upload","/upload/h_200,w_200");
    if(!list){
        req.flash("failure","List does not exist");
        return res.redirect("/listing");
    }
    res.render("listings/edit.ejs",{list,originalImage})
})

module.exports.editlist=wrapAsync(async (req,res)=>{
    let id=req.params.id;
    let {list}=req.body;

    let response=await geocodingClient.forwardGeocode({
        query:req.body.list.location,
        limit: 1
    })
    .send();

    list.geometry=response.body.features[0].geometry;

    let listing=await List.findByIdAndUpdate(id,list);



    if(req.file!==undefined){

     let url=req.file.path;
     let filename=req.file.filename;
     listing.image={url,filename};

     listing.save();
    }

    req.flash("success","List is Updated");
    res.redirect(`/listing/${id}`);
})

module.exports.showlist=wrapAsync(async (req,res)=>{  
    let id=req.params.id;
    let oneList=await List.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner");
    if(!oneList){
        req.flash("failure","List does not exist");
        res.redirect("/listing");
    }
    res.render("listings/show.ejs",{oneList});
})

module.exports.createList=wrapAsync(async (req,res)=>{
    let response=await geocodingClient.forwardGeocode({
        query:req.body.list.location,
        limit: 1
    })
    .send();

    let url=req.file.path;
    let filename=req.file.filename;
    let {list}=req.body;
    newlist={...list,owner:req.user,image:{url,filename},geometry:response.body.features[0].geometry};
    await List.create(newlist);
    req.flash("success","New List is Created");
    res.redirect("/listing");
})

module.exports.destorylist=wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await List.findByIdAndDelete(id);
    req.flash("success","Listing is Deleted");
    res.redirect("/listing");
});