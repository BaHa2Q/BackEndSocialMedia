const mongoose = require("mongoose");
const Schema = mongoose.Schema
const PostsSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  text: {
    type: String,
  },
  name: {
    type: String,
  },

  image: {
    type: String,
  },
  DeleteAt: {
    type: Date,
    default: null,
  },
  UpdateAt: {
    type: Date,
    default: null,
  },
  CreateAt: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.model("PostDs", PostsSchema);

module.exports = Posts;
