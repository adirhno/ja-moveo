const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineSchema = new Schema({
  lyrics: { type: String, required: true },
  chords: { type: String },
});

const Line = mongoose.model("Line", lineSchema);
module.exports = Line;
