const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
require("dotenv").config();
const KEY = process.env.KEY;

// Register Endpoint
userRouter.post("/register", async (req, res) => {
  const { name, email, password, dob, bio } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, secure_pass) => {
      if (err) {
        console.log("Error while hashing the password", err);
      } else {
        const user = new UserModel({
          name,
          email,
          password: secure_pass,
          dob,
          bio,
        });

        await user.save();
        res.send("New User Registered Successfully");
      }
    });
  } catch (error) {
    console.log("Error while Registering the User", error);
    res.send("Error while Registering the User");
  }
});

// Get All users Endpoint
userRouter.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});

// Get friends of a user Endpoint
userRouter.get("/:id/friends", async (req, res) => {
  const ID = req.params.id;

  try {
    const user = await UserModel.find({ _id: ID })
      .populate("friends", "-password")
      .select("friends");

    if (!user) {
      res.send("User Not Found");
    }

    res.send(user.friends);
  } catch (error) {
    console.log("Error while finding friends :", error);
    res.send("Error while finding the friends");
  }
});

// Send friend request Endpoint
userRouter.post("/:id/friends", async (req, res) => {
  const userID = req.params.id;
  const { friendID } = req.body;
  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      res.send("User Not Found");
    }

    const friend = await UserModel.findById(friendID);
    if (!friend) {
      res.send("Friend Not Found");
    }

    const alreadySent = user.friendRequests.some((friendRequest) => {
      friendRequest.equals(friendID);
    });

    if (alreadySent) {
      res.send("Friend Request Already Sent");
    }

    const AlreadyAFriend = user.friends.some((friend) => {
      friend.equals(friendID);
    });

    if (AlreadyAFriend) {
      res.send("Already a friend");
    }

    user.friendRequests.push(friendID);
    await user.save();
    res.send("Friend Request Sent Successfully");
  } catch (error) {
    console.log("Error while Sending friend request :", error);
    res.send("Error while Sending friend request");
  }
});

userRouter.patch("/:id/friends/:friendId", async (req, res) => {
  const userId = req.params.id;
  const friendId = req.params.friendId;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      res.send("User Not Found");
    }

    const friend = await UserModel.findById(friendId);
    if (!friend) {
      res.send("Friend Not Found");
    }

    if (!user.friendRequests.includes(friendId)) {
      res.send("Friend request not present");
    }

    user.friends.push(friend);
    user.friendRequests.splice(user.friendRequests.indexOf(friend), 1);
    friend.friends.push(user);

    await user.save();
    await friend.save();
    res.send("Friend request accepted successfully");
  } catch (error) {
    console.log("Error while accepting friend request", error);
    res.send("Error while accepting friend request");
  }
});

module.exports = {
  userRouter,
};
