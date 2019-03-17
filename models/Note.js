var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// create schema object
var NoteSchema = new Schema({
    title: String,
    body: String
  });

// create model
var Note = mongoose.model("Note", NoteSchema);

// export model
module.exports = Note;