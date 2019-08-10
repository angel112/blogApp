var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
app = express(), 
methodOverride = require('method-override'),
expressSanitizer = require('express-sanitizer');

//APP CONFIGS
mongoose.connect("mongodb://localhost/blogApp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);
//RESTful ROUTES

app.get("/", function(req, res){
    res.redirect("/blogs");
});

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

app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
            alert("Something just happened!!!");
            var n = foundBlog.body.length;
        }else{
            res.render("show", {blog: foundBlog});
        }
    });
});

app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
            alert("SOMETHING JUST WENT WRONG!!");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
            alert("SOMETHING JUST WENT WRONG!!");
        }else{
            res.redirect("/blogs/" + req.params.id); 
        }
    });
});

app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
        console.log(err);
        alert("SOMETHING JUST WENT WRONG!!");
       } 
       res.redirect("/blogs");
    });
});

app.listen(3000, function(){
    console.log("Server has started");
});