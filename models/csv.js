const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  csv: {
    type: String,
    required: true,
  },
});

const Csv = mongoose.model("csv", contactSchema);

module.exports = Csv;
