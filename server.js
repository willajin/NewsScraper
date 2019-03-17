// dependencies
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");

// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// require models
var db = require("./models");

var PORT = 3000;

// initialize express
var app = express();

// set up middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// connect to MongoDB
mongoose.connect("mongodb://localhost/Week18Homework", { useNewUrlParser: true });

// routes
// GET route to scrape news website
app.get("/scrape", function(req, res) {
    // axios
    axios.get("").then(function(response) {
        // load to cheerio
        var $ = cheerio.load(response.data);

        // grab tag in article to save properties
        $("").each(function(i, element) {
            var result = {};

            // save title & link of article

            // create new Article
            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });
        });

        res.send("Scrape complete.");
    });
});

// GET route to get all articles from db
app.get("/articles", function(req, res) {

});

// GET route to get specific article and populate with corresponding note
app.get("/articles/:id", function(req, res) {

});

// POST route to update & save note to corresponding article
app.post("/articles/:id", function(req, res) {

});

// start server listen
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });