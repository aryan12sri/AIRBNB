    //DOT ENV
    if (process.env.NODE_ENV !="production") {
        require('dotenv').config()
    }
    const express=require("express");
    const mongoose=require("mongoose");
    const path=require("path");
    const app=express();
    const methodoverride=require("method-override");
    const ejsmate=require("ejs-mate");
    const session=require("express-session");
    const MongoStore = require('connect-mongo');
    const flash=require("connect-flash");
    const passport=require("passport");
    const LocalStrategy = require('passport-local');
    const listingrouter=require("./router/listing.js");
    const reviewrouter=require("./router/review.js")
    const Userrouter=require("./router/user.js");
    const userlogin=require("./models/user.js");
    
    app.use(express.urlencoded({extended:true}));
    app.use(methodoverride("_method"));
    app.use(express.static(path.join(__dirname,"public")));
    app.use(flash());

    let store=MongoStore.create({
         mongoUrl: process.env.ATLAS_DB,
         touchAfter:24*60*60,
         crypto: {
            secret:process.env.SECRET.
         }
    })

    store.on("error")

    app.use(session({
        store,
        secret:process.env.SECRET,
        resave:false,
        saveUninitialized:true,
        cookie:{
            expires:Date.now()*7*24*60*60*1000,
            maxAge:7 * 24 * 60 *60 *1000,
            httpOnly:true
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(userlogin.authenticate()));
    passport.serializeUser(userlogin.serializeUser());
    passport.deserializeUser(userlogin.deserializeUser());  




    //ejs mate
    app.engine('ejs',ejsmate );

    //ejs setting   
    app.set("views",path.join(__dirname,"views"))
    app.set("view engine","ejs");

    //Port listening
    app.listen("8080",()=>{
        console.log("listening to the port")
    })  

    //mongoose connection
    async function main() {
        await mongoose.connect(process.env.ATLAS_DB);
    }

    main()
    .then(res=>{
        console.log("connected to database");
    })
    .catch(err=>{
        console.log("some error")
    })

   

    app.use((req,res,next)=>{
        res.locals.success=req.flash("success");
        res.locals.failure=req.flash("failure");
        res.locals.error=req.flash("error");
        res.locals.curruser=req.user;
        next();
    })

    //Router Middlerware//
    app.use("/listing",listingrouter);
    app.use("/listing/:id",reviewrouter);    
    app.use("/",Userrouter)


    //testing//
    app.get("/",(req,res)=>{ 
        if(req.session.count){
            req.session.count++;
        }else{
            req.session.count=1
        }
        console.log(req.session);
        res.send(`this has count of ${req.session.count}`)
    });
    
    
    app.use((err,req,res,next)=>{
    let {statuscode=500,message="this is an error"}=err;
    res.status(statuscode).render("listings/error.ejs",{message});
    })
