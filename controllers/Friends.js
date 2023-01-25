const express = require("express");
const router = express.Router();
const config = require('config')

// Load User model
const auth = require("../config/auth");
const Friends =  require("../models/Friends");
const Profile = require("../models/Profile");
const Notification = require("../models/Notification");
const User = require("../models/User");

router.get("/", auth,async (req, res) => {
  const Test3 = await Profile.find({_id:req.user.MyprofileId});
  const Test4 = Test3.map(data => data._id)
  const myprofile = await Friends.find({profileId:Test4});
  const Profilefriend = await Profile.find()
//   const AddFriend = Profilefriend.filter(data => data.userId.toString() === friend)

    res.send(myprofile)
});
router.get("/friend", auth,async (req, res) => {
  const myprofile = await Friends.find({profileId:req.user.MyProfileId});
  const friendprofile = await Friends.find({friendprofileId:req.user.MyProfileId});
  res.send({myprofile,friendprofile});

});

router.get("/waDit", auth,async (req, res) => {
  const friend = await Friends.find();
  const Friend = friend.filter(({request}) => request === true);
  res.send(Friend);

});
router.put("/agree/:id", auth, (req, res) => {
  const thing = {
    request:true
    
  };
  Friends.findOneAndUpdate({ friendprofileId: req.user.MyProfileId }, thing)
    .then((data) => res.send(data))
    .catch((data) => res.send(data.message));
});

router.delete("/reject/:id", auth,async (req, res) => {

 const reject = await Friends.findOneAndDelete({ userId: req.params.id })
    const friendId = reject._id
    const notification =  await Notification.findOneAndDelete({typeId:friendId})
    res.send(notification)

});
router.get("/realfriend", auth,async (req, res) => {

  const reject = await Friends.findOneAndDelete({ userId: req.params.id })
     const friendId = reject._id
     const notification =  await Notification.findOneAndDelete({typeId:friendId})
     res.send(notification)
 
 });
  router.post("/Add/:id", auth, async (req, res) => {
    const {_id} = req.body
    const FindFriend = await Friends.find({friendprofileId:req.params.id});
    const FindFriend2 = await Profile.find({userId:req.user.id})
    const profileId = FindFriend2.map(data => data._id)
    const FindFriend3 =  (await Friends.find({friendprofileId:req.params.id})).map(data => data._id);
    const AddFriend = FindFriend.filter(data => data.profileId.toString() === req.user.id).length > 0
    if (AddFriend) {
      return (res.status(201).json({message:"يوجد طلب بالفعل"}))
    }
    
      const newFriend = new Friends({
        _id,
        profileId:profileId,
        friendprofileId:req.params.id
        
      })
      const Addfriend = await newFriend.save();
      const newNotification = new Notification({
        type:"friend",
        typeId:Addfriend._id
        
      })
      const AddNotification = await newNotification.save();
      res.json(AddNotification);

    
  });
  // router.post("/:id", auth, async (req, res) => {
  //   const FindFriend = await Friends.find({profileId:req.params.id});
  //   const FindFriend2 = await Profile.find({userId:req.user.id});
  //    const AddFriend = FindFriend.filter(data => data.userId.toString() === req.user.id).length > 0
  //    const Delete = FindFriend.filter(data => data.userId.toString() === req.user.id)
  //    const DeleteFriend = Delete.map(data => data._id)
  //    const whiteDwarf = async () => {
  //       Friends.findByIdAndDelete(DeleteFriend).then(data => 
  //       res.send(data)
  //       )
  //   }
  //   if (AddFriend) {
  //     return whiteDwarf()
  //   }
    
  //     const newFriend = new Friends({
  //       userId:req.user.id,
  //       profileId:req.params.id
        
  //     })
  //     const friend = await newFriend.save();
  //     res.json(FindFriend2);

    
  // });











  
module.exports = router;
