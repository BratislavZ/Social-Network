const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middlewares/is-auth");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/new-post", isAuth, postController.createPost);

router.get("/like/:postId", isAuth, postController.likePost);
router.get("/dislike/:postId", isAuth, postController.dislikePost);
router.get("/likes/:postId", isAuth, postController.getLikes);

router.delete("/delete/:postId", isAuth, postController.deletePost);

router.get("/feed", isAuth, postController.getFeedPosts);
router.get("/feed/profile/:userId", isAuth, postController.getProfilePosts);

module.exports = router;
