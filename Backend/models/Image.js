const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  image: { data: Buffer, contentType: String },
});

const ImageModel = mongoose.model("Image", imageSchema);
module.exports = ImageModel;
