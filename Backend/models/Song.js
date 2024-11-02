/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
	name: String,
	artist: String,
	song:[{}],
	image: { type: mongoose.Schema.Types.ObjectId,ref: 'Image'}
});

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
