const express = require('express'),
     mongoose = require('mongoose'),
   bodyParser = require('body-parser'),
         port = 3000,
          app = express(),
       Schema = mongoose.Schema;

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
let blogSchema = new Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title:"Test",
//     image: "https://images.unsplash.com/photo-1578601163666-47c726ce64fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=200&w=200&q=80",
//     body: "This is a test"
// })

// RESTFUL ROUTES

app.get('/', (req,res) => {
    res.redirect('/blogs') // This will redirect any user who goes onto site land in correct page
});
app.get('/blogs',(req,res) => {
    Blog.find({}, (err, blogs) =>{
        if(err){
            console.log('Error!', err);
        } else {
            res.render('index',{blogs: blogs});
        }
    });
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`)
})
