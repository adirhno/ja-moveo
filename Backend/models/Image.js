const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  image: { type: String } // Base64 string
});

const ImageModel = mongoose.model("Image", imageSchema);
module.exports = ImageModel;
