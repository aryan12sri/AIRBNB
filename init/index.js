const mongoose=require("mongoose");
const User=require("../models/listing.js");
let iddb=require("./init.js")

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb')
}

main()
.then(res=>{
    console.log("connected to database");
})
.catch(err=>{
    console.log("some error")
});


async function insert() {

    await User.deleteMany({});
    iddb=iddb.map((el)=>({...el,owner:"67d171eb4528b7e29affc25b"}));
    await User.insertMany(iddb);

}

insert();