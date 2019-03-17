var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// create schema object
var ArticleSchema = new Schema({
    headline: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    url: {
        type: String,
        required: true
    },
    note: {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  });
  
  // create model
  var Article = mongoose.model("Article", ArticleSchema);
  
  // export model
  module.exports = Article;