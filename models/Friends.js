const mongoose = require("mongoose");
const Schema = mongoose.Schema
const FriendsSchema = new mongoose.Schema({
  profileId: {
    type: Schema.Types.ObjectId,
  },
  friendprofileId:{
    type: Schema.Types.ObjectId,
  },
  request:{
    type:Boolean,
    default:false
  },
  CreateAt: {
    type: Date,
    default: Date.now,
  },
});

const Friends = mongoose.model("FrDiends", FriendsSchema);

module.exports = Friends;
