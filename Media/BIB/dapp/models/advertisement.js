const mongoose = require("mongoose");

var advertisementSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: "This field is required."
  },
  type: {
    type: String
  }
});

mongoose.model("Advertisement", advertisementSchema);
