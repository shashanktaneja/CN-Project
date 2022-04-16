var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Stories = new Schema({
  caption: {
    type: String,
    required: true,
  },
  data: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  key: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Stories", Stories);
