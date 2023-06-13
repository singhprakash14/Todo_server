const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "pending",
  },
});

const TodoModel = mongoose.model("TodoModel", TodoSchema);

module.exports = TodoModel;
