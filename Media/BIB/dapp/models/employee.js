const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: "This field is required."
  },
  type: {
    type: String
  },
  viewtime: {
    type: String
  }
});

mongoose.model("Employee", employeeSchema);
