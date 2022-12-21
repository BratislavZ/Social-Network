const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const { deleteFile, getObjectSignedUrl, uploadFile } = require("../helpers/s3");

const Post = require("../models/Post");
const User = require("../models/User");

exports.deleteUser = async (req, res, next) => {
  const userId = req.userId;

  try {
    const deletedUser = await User.findByIdAndRemove(userId);
    if (deletedUser.coverPictureKey) {
      await deleteFile(deletedUser.coverPictureKey);
    }
    if (deletedUser.profilePictureKey) {
      await deleteFile(deletedUser.profilePictureKey);
    }

    const posts = await Post.find({ creator: deletedUser._id });
    for (let post of posts) {
      if (post.imageKey) {
        await deleteFile(post.imageKey);
      }
    }

    await Post.deleteMany({ creator: deletedUser._id });
    await Post.updateMany({}, { $pull: { likes: deletedUser._id } });
    await User.updateMany({}, { $pull: { followers: deletedUser._id } });
    await User.updateMany({}, { $pull: { followings: deletedUser._id } });

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.getUser = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      const error = new Error("Could't find the user.");
      error.statusCode = 404;
      throw error;
    }

    let profilePictureUrl = "";
    if (user.profilePictureKey) {
      profilePictureUrl = await getObjectSignedUrl(user.profilePictureKey);
    }

    let coverPictureUrl = "";
    if (user.coverPictureKey) {
      coverPictureUrl = await getObjectSignedUrl(user.coverPictureKey);
    }

    const { password, updatedAt, ...other } = user._doc;
    let isFollowed;

    // getting user for Profile page that is not ours
    if (userId !== req.params.userId) {
      const existingFollower = user.followers.find(
        (_id) => _id.toString() === userId
      );
      if (existingFollower) {
        isFollowed = true;
      } else {
        isFollowed = false;
      }
    }
    const data = {
      ...other,
      profilePicture: profilePictureUrl,
      coverPicture: coverPictureUrl,
      isFollowed,
    };
    res.status(200).json({ message: "User was found.", user: data });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.followUser = async (req, res, next) => {
  try {
    if (req.userId === req.params.userId) {
      const error = new Error("You can't follow yourself!");
      error.statusCode = 403;
      throw error;
    }
    const userToFollow = await User.findById(req.params.userId);
    const user = await User.findById(req.userId);
    if (!userToFollow || !user) {
      const error = new Error("Could't find the user.");
      error.statusCode = 404;
      throw error;
    }
    const existingFollower = userToFollow.followers.find(
      (follower) => follower._id.toString() === req.userId
    );
    if (existingFollower) {
      const error = new Error("You allready follow this user.");
      error.statusCode = 403;
      throw error;
    }
    userToFollow.followers.push(user);
    user.followings.push(userToFollow);
    await userToFollow.save();
    await user.save();
    res.status(200).json({ message: "You follow new user!" });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.unfollowUser = async (req, res, next) => {
  try {
    if (req.userId === req.params.userId) {
      const error = new Error("You can't unfollow yourself!");
      error.statusCode = 403;
      throw error;
    }
    const userToUnfollow = await User.findById(req.params.userId);
    const user = await User.findById(req.userId);
    if (!userToUnfollow || !user) {
      const error = new Error("Could't find the user.");
      error.statusCode = 404;
      throw error;
    }
    userToUnfollow.followers.pull(user._id);
    user.followings.pull(userToUnfollow._id);
    await userToUnfollow.save();
    await user.save();
    res.status(200).json({ message: "You unfollowed a user!" });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.getUsersToFollow = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const followings = user.followings;

    // find users that can be followed
    const people = await User.find(
      { _id: { $nin: followings.concat(userId) } },
      { username: 1, profilePictureKey: 1, followers: 1 }
    );

    const peopleData = await Promise.all(
      people.map(async (person) => {
        let profilePictureUrl = "";
        if (person.profilePictureKey) {
          profilePictureUrl = await getObjectSignedUrl(
            person.profilePictureKey
          );
        }
        return {
          ...person._doc,
          profilePicture: profilePictureUrl,
        };
      })
    );
    consoleData("peopleData0", peopleData);
    res.status(200).json({ people: peopleData });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.getFollowers = async (req, res, next) => {
  const personId = req.params.personId;
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 10;

  try {
    const user = await User.findById(personId).populate(
      "followers",
      "username profilePictureKey"
    );
    if (!user) {
      const error = new Error("Could't find the user.");
      error.statusCode = 404;
      throw error;
    }
    const totalFollowers = user.followers.length;
    const start = (currentPage - 1) * perPage;
    const end = currentPage * perPage;
    const followers = user.followers.slice(start, end);

    const followersData = await Promise.all(
      followers.map(async (follower) => {
        let profilePictureUrl = "";
        if (follower.profilePictureKey) {
          profilePictureUrl = await getObjectSignedUrl(
            follower.profilePictureKey
          );
        }
        return {
          ...follower._doc,
          profilePicture: profilePictureUrl,
        };
      })
    );
    const data = {
      _id: user._id,
      followers: followersData,
      totalFollowers,
    };

    res.status(200).json({
      message: "List of followers.",
      user: data,
    });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.getFollowings = async (req, res, next) => {
  const personId = req.params.personId;
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 10;

  try {
    const user = await User.findById(personId).populate(
      "followings",
      "username profilePictureKey"
    );
    if (!user) {
      const error = new Error("Could't find the user.");
      error.statusCode = 404;
      throw error;
    }
    const totalFollowings = user.followings.length;
    const start = (currentPage - 1) * perPage;
    const end = currentPage * perPage;
    const followings = user.followings.slice(start, end);

    const followingsData = await Promise.all(
      followings.map(async (following) => {
        let profilePictureUrl = "";
        if (following.profilePictureKey) {
          profilePictureUrl = await getObjectSignedUrl(
            following.profilePictureKey
          );
        }
        return {
          ...following._doc,
          profilePicture: profilePictureUrl,
        };
      })
    );

    const data = {
      _id: user._id,
      followings: followingsData,
      totalFollowings,
    };

    res.status(200).json({
      message: "List of followings.",
      user: data,
    });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  consoleData("req-body", req.body);
  const userId = req.userId;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Could't find the user.");
      error.statusCode = 404;
      throw error;
    }
    user.username = req.body.username;
    user.city = req.body.city;
    user.from = req.body.from;
    user.gender = req.body.gender;
    const savedUser = await user.save();

    let profilePictureUrl = "";
    if (savedUser.profilePictureKey) {
      profilePictureUrl = await getObjectSignedUrl(savedUser.profilePictureKey);
    }

    let coverPictureUrl = "";
    if (savedUser.coverPictureKey) {
      coverPictureUrl = await getObjectSignedUrl(savedUser.coverPictureKey);
    }

    const { password, updatedAt, ...other } = savedUser._doc;

    res.status(200).json({
      message: "User updated.",
      user: {
        ...other,
        profilePicture: profilePictureUrl,
        coverPicture: coverPictureUrl,
      },
    });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.updateProfileImg = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("No image provided.");
      error.statusCode = 422;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Could't find the user.");
      error.statusCode = 404;
      throw error;
    }
    // if user already had profile picture
    if (user.profilePictureKey) {
      await deleteFile(user.profilePictureKey);
    }
    const newImageKey = uuidv4();
    await uploadFile(req.file.buffer, newImageKey, req.file.mimetype);

    user.profilePictureKey = newImageKey;
    const savedUser = await user.save();

    const profilePictureUrl = await getObjectSignedUrl(
      savedUser.profilePictureKey
    );

    let coverPictureUrl = "";
    if (savedUser.coverPictureKey) {
      coverPictureUrl = await getObjectSignedUrl(savedUser.coverPictureKey);
    }

    const { password, updatedAt, ...other } = savedUser._doc;
    res.status(200).json({
      message: "User updated.",
      user: {
        ...other,
        profilePicture: profilePictureUrl,
        coverPicture: coverPictureUrl,
      },
    });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.updateCoverImg = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("No image provided.");
      error.statusCode = 422;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Could't find the user.");
      error.statusCode = 404;
      throw error;
    }
    // if user already had cover picture
    if (user.coverPictureKey) {
      await deleteFile(user.coverPictureKey);
    }
    const newImageKey = uuidv4();
    await uploadFile(req.file.buffer, newImageKey, req.file.mimetype);

    user.coverPictureKey = newImageKey;
    const savedUser = await user.save();

    const coverPictureUrl = await getObjectSignedUrl(savedUser.coverPictureKey);

    let profilePictureUrl = "";
    if (savedUser.profilePictureKey) {
      profilePictureUrl = await getObjectSignedUrl(savedUser.profilePictureKey);
    }

    const { password, updatedAt, ...other } = savedUser._doc;
    res.status(200).json({
      message: "User updated.",
      user: {
        ...other,
        coverPicture: coverPictureUrl,
        profilePicture: profilePictureUrl,
      },
    });
  } catch (err) {
    catchHandler(next, err);
  }
};

const catchHandler = (next, err) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};

const consoleData = (dataName, data = "") => {
  console.log("\x1b[33m%s\x1b[0m", dataName, data);
};
