const express = require("express");
const router = express.Router();
const config = require('config')

// Load User model
const auth = require("../config/auth");
const Notification = require("../models/Notification");
const Friends = require("../models/Friends");
const Profile = require("../models/Profile");
const User = require("../models/User");


router.get("/", auth,async (req, res) => {
  const friend = await Friends.find({friendprofileId:req.user.MyProfileId})
  const Test = friend.map(data => data._id)
  const notification =  await Notification.find({typeId:Test}).where({view:false  })
    res.send(notification)
});
router.get("/friend", auth,async (req, res) => {

  const friend = await Friends.find({friendprofileId:req.user.MyProfileId})
  const Test = friend.map(data => data._id)
  const notification =  await Notification.find({typeId:Test}).where({view:false  })
  const Test2 = notification.map(data => data.typeId)
  const requsetNotification =  await Friends.find({_id:Test2})
  const Test3 = requsetNotification.map(data => data.profileId)
  const profile2 = await Profile.find({_id:Test3}) 
    res.send(profile2)
});
router.get("/realfriend", auth,async (req, res) => {
 
  const friend = await Friends.find()
    res.send(friend)
});
module.exports = router;
