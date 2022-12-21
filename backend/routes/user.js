const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middlewares/is-auth");
const userController = require("../controllers/userController");

const router = express.Router();

router.delete("/", isAuth, userController.deleteUser);

router.put(
  "/info",
  isAuth,
  [body("username").trim().not().isEmpty()],
  userController.updateUserInfo
);

router.get("/people", isAuth, userController.getUsersToFollow);

router.post("/profileImage", isAuth, userController.updateProfileImg);
router.post("/coverImage", isAuth, userController.updateCoverImg);

router.get("/:userId", isAuth, userController.getUser);

router.get("/follow/:userId", isAuth, userController.followUser);
router.get("/unfollow/:userId", isAuth, userController.unfollowUser);
router.get("/followers/:personId", isAuth, userController.getFollowers);
router.get("/followings/:personId", isAuth, userController.getFollowings);

module.exports = router;
