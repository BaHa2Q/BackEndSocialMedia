const mongoose = require("mongoose");
const Schema = mongoose.Schema
const SectionTokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  token: {
    type: String,
  },
  CreateAt: {
    type: Date,
    default: Date.now,
  },
});

const SectionToken = mongoose.model("SectionToken", SectionTokenSchema);

module.exports = SectionToken;
