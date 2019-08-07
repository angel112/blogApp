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
//RESTful ROUTES

app.get("/blogs", function(req,res){
    Blog.find({}, function(err, foundBlogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: foundBlogs});
        }
    });
});

app.get("/blogs/new", function(req, res){
    res.render("new");
}); 


app.post("/blogs", function(req,res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
            res.render("new");
            alert("Something just happened!!");
        }
        res.redirect("/blogs");
    });
});

app.listen(3000, function(){
    console.log("Server has started");
});
