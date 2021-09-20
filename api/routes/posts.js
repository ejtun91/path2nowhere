const User = require("../models/User");
const router = require("express").Router();
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const post = new Post(req.body);
  try {
    const newPost = await post.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you cannot update this post");
    }
  } catch (error) {
    res.status(404).json("post not found");
  }
});
//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("post has been deleted...");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you cannot delete this post");
    }
  } catch (error) {
    res.status(404).json("post not found");
  }
});
//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//SEARCH ALL POSTS
// router.get("/", async (req, res) => {
//   const search = req.query.search;

//   try {
//     let searchQuery;
//     if (search) {
//       searchQuery = await Post.find({ title });
//     } else {
//       searchQuery = await Post.find();
//     }
//     res.status(200).json(searchQuery);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const search = req.query.search;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else if (search) {
      posts = await Post.find({ title: { $regex: search, $options: "i" } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
