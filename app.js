var express=require("express");
var app=express();
var request=require("request");

app.use(express.static('./public'));
app.set('view engine','ejs')
app.get("/" ,function(req,res){
  
    let url=`https://disease.sh/v2/all?yesterday=true`;
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){
            var data=JSON.parse(body)
            res.render("search",{global:data});
        }
    });

});
app.get("/about",function(req,res){
    res.render("about")
});
app.get("/FAQ",function(req,res){
    res.render("faq")
});
app.get("/myth",function(req,res){
    res.render("myth")
});
app.get("/",function(req,res){
    res.render("search")

});
app.get("/corona",function(req,res){
    let val=req.query.name;
    let url=`https://disease.sh/v2/countries/${val}`;
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){
            var data=JSON.parse(body)

        
        res.render("corona",{data:data});
        
    
        }
        else{
            res.render("error");
        }
    });


});
app.listen("1000");