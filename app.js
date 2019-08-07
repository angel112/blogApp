var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
app = express();

//APP CONFIGS
mongoose.connect("mongodb://localhost/blogApp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: "First Blog",
    image: "https://scatter.co.in/wp-content/uploads/2018/01/shutterstock_720876373.jpg",
    body: "I started making a blog App today!!" 
})

//RESTful ROUTES

app.get("/blogs", function(req,res){

})

app.listen(3000, function(){
    console.log("Server has started");
});
