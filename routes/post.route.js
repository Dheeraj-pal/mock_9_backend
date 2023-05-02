const express = require("express");
const { PostModel } = require("../models/post.model");
const postRouter = express.Router();

// Get all the posts
postRouter.get("/", async (req, res) => {
  const posts = await PostModel.find();
  res.send(posts);
});

// Create a new Post
postRouter.post("/", async (req, res) => {
  const { user, text, image } = req.body;

  try {
    const post = new PostModel({ user, text, image });
    await post.save();
    res.send({ msg: "New post created", post });
  } catch (error) {
    console.log("Error while posting", error);
    res.send("Error while posting");
  }
});

postRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { text, image } = req.body;

  try {
    const post = await PostModel.findOne({ _id: id });

    if (!post) {
      res.send("Post not found");
    }
    if (text) {
      post.text = text;
    }
    if (image) {
      post.image = image;
    }

    await post.save();
    res.send(post);
  } catch (error) {
    console.log("Error while Updating post", error);
    res.send("Error while Updating post");
  }
});

postRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findOneAndDelete({ _id: "id" });

    await post.save();
    res.send("Post deleted");
  } catch (error) {
    console.log("Error while Deleting post", error);
    res.send("Error while Deleting post");
  }
});

postRouter.post("/:id/like", async (req, res) => {
  const { id } = req.params;
  const userId = req.body.id;

  try {
    const post = await PostModel.findOne({ _id: id });
    if (!post) {
      res.send("Post not Found");
    }

    const likedAlready = post.likes.includes(userId);
    if (likedAlready) {
      res.send("Liked the post Already");
    }

    post.likes.push(userId);
    await post.save();
    res.send({ msg: "Post liked successfully", post });
  } catch (error) {
    console.log("Error while liking the post", error);
    res.send("Error while liking the post");
  }
});

postRouter.post("/:id/comment", async (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;

  try {
    const post = await PostModel.findOne({ _id: id });
    if (!post) {
      res.send("Post not Found");
    }

    const comment = {
      user,
      text,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    res.send({ msg: "Comment added successfully", post });
  } catch (error) {
    console.log("Error while adding comment to the post", error);
    res.send("Error while adding comment to the post");
  }
});

postRouter.get("/:id", async (req, res) => {
  const ID = req.params.id;

  try {
    const post = await PostModel.find({ _id: ID });
    res.send(post);
  } catch (error) {
    console.log("Error while finding specific post", error);
    res.send("Error while finding specific post");
  }
});

module.exports = {
  postRouter,
};
