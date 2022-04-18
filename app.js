const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.get("/",function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
         members: [
             {
                 email_address: email,
                 status: "subscribed",
                 merge_fields: {
                     FNAME: firstName,
                     LNAME: lastName
                 }

             }
         ]
    };

    var jsonData = JSON.stringify(data);
    const url = config.url;
    const options = {
        method: "POST",
        auth: congif.auth
    }
    const request = https.request(url,options,function(response) {
        if (response.statusCode !== 200) {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            const receivedData = JSON.parse(data);
            console.log("naber");
            if (receivedData.error_count != 0) {
                console.log(JSON.parse(data));
                res.sendFile(__dirname + "/failure.html");  
            } 
            else {
                res.sendFile(__dirname + "/success.html");
                console.log("selam");
            }
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});




app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
});


//https://warm-basin-69611.herokuapp.com/