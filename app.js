const express=require("express");
const https=require("https");
const app= express();
app.listen(3000,function(){
    console.log("app running on port 3000");
})
app.get("/",function(req,res){
    const query="London";
    const apikey="838ff09b2e2762710a8513b183a16a60";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    https.get(url,function(resp){
        console.log(resp.statusCode);
        resp.on("data",function(data){
        
            const wether=JSON.parse(data);
            const temp1=wether.main.temp;
            const country=wether.sys.country;
            const weatherdes=wether.weather[0].main;
            const icon=wether.weather[0].icon;
            const  imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            //only one res.send works in code then you can use res.write
            res.write(" <p>Weather description is "+weatherdes+"</p>");
          res.write("<h1>The temp in "+country+" is "+temp1+"celsius</h1>");
          res.write("<img src="+imgurl+">");
          res.send();
        //    console.log(temp1);
        //     console.log(temp);
        })
    })
    //res.send("server is up and running");
    // res.sendFile(__dirname+"/index.html")
})