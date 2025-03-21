const userlogin=require("../models/user");

module.exports.renderSignupform=(req,res)=>{
    res.render("user/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
       let {Username,email,password}=req.body;
       let newuser= new userlogin({
        email:email,
        username:Username
      })
      let result=await userlogin.register(newuser,password);
       req.login(result,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success","Welcome to airbnb");
        res.redirect("/listing");
      })  
    }catch(err){
      req.flash("failure","username already exist");
      res.redirect("/signup")
    }
}

module.exports.renderloginform=(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.login= (req, res) => {
    req.flash("success", "Welcome to Airbnb!");
    if(res.locals.currurl){
     return res.redirect(res.locals.currurl);
    }
    res.redirect("/listing")
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","logged out");
      res.redirect("/listing");
    })
}