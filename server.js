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

// set up handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connect to MongoDB
mongoose.connect("mongodb://localhost/Week18Homework", { useNewUrlParser: true });

// routes
// GET route to scrape news website
app.get("/scrape", function (req, res) {
    // axios
    axios.get("https://www.vox.com/").then(function (response) {
        // load to cheerio
        var $ = cheerio.load(response.data);

        // grab tag in article to save properties
        $(".c-entry-box--compact__title").each(function (i, element) {
            const result = {};

            // save title & link of article
            result.headline = $(this)
                .children("a")
                .text();
            if ($(this).parent().children('p').text()) {
                result.summary = $(this).parent().children('p').text()
            }
            result.url = $(this)
                .children("a")
                .attr("href");

            //create new Article
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        res.send("Scrape complete.");
    });
});

// GET route to get all articles from db
app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// GET route to get specific article and populate with corresponding note
app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// POST route to update & save note to corresponding article
app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// start server listen
app.listen(PORT, function () {
    console.log("App running on port " + PORT);
});