const { v4: uuidv4 } = require("uuid");

const Post = require("../models/Post");
const User = require("../models/User");
const { uploadFile, getObjectSignedUrl, deleteFile } = require("../helpers/s3");

exports.createPost = async (req, res, next) => {
  try {
    const desc = req.body.desc || "";
    let imageKey = "";

    if (req.file) {
      // upload file to AWS
      imageKey = uuidv4();
      await uploadFile(req.file.buffer, imageKey, req.file.mimetype);
    }
    const post = new Post({
      creator: req.userId,
      desc,
      imageKey,
      likes: [],
    });
    const savedPost = await (
      await post.save()
    ).populate("creator", "username profilePictureKey");

    let postImageUrl = "";
    if (savedPost.imageKey) {
      // generate url from AWS
      postImageUrl = await getObjectSignedUrl(savedPost.imageKey);
    }
    let profilePictureUrl = "";
    const profilePictureKey = savedPost.creator.profilePictureKey;
    if (profilePictureKey) {
      profilePictureUrl = await getObjectSignedUrl(profilePictureKey);
    }
    const creatorData = {
      ...savedPost._doc.creator._doc,
      profilePicture: profilePictureUrl,
    };

    const postData = {
      ...savedPost._doc,
      creator: creatorData,
      imageUrl: postImageUrl,
    };

    res.status(201).json({
      message: "Post created successfully!",
      post: postData,
    });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could't find the post.");
      error.statusCode = 404;
      throw error;
    }
    if (req.userId !== post.creator._id.toString()) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }
    if (post.imageKey) {
      await deleteFile(post.imageKey);
    }
    await Post.findByIdAndRemove(postId);
    res.status(200).json({ message: "Post deleted", postId });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.likePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could't find the post.");
      error.statusCode = 404;
      throw error;
    }
    const existingLike = post.likes.find(
      (userId) => userId.toString() === req.userId
    );
    if (existingLike) {
      const error = new Error("User has already liked the post.");
      throw error;
    }
    post.likes.push(req.userId);
    await post.save();
    res.status(200).json({ message: "Post liked." });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.dislikePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could't find the post.");
      error.statusCode = 404;
      throw error;
    }
    const existingLike = post.likes.find(
      (userId) => userId.toString() === req.userId
    );
    if (!existingLike) {
      const error = new Error("User isn't on the 'likes' list.");
      throw error;
    }
    post.likes.pull(req.userId);
    await post.save();
    res.status(200).json({ message: "Post disliked" });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.getFeedPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    // get our and our followings posts
    const postData = await Post.find({
      $or: [{ creator: req.userId }, { creator: { $in: user.followings } }],
    })
      .sort({ createdAt: -1 })
      .populate("creator", "username profilePictureKey");

    const posts = await getPostsWithImages(postData);

    res.status(200).json({ message: "Main feed posts.", posts });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.getProfilePosts = async (req, res, next) => {
  try {
    const postData = await Post.find({ creator: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("creator", "username profilePictureKey");

    if (!postData) {
      const error = new Error("Could't find the posts.");
      error.statusCode = 404;
      throw error;
    }

    const posts = await getPostsWithImages(postData);

    res.status(200).json({ message: "Profile posts.", posts });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.getLikes = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId).populate(
      "likes",
      "username profilePictureKey"
    );
    if (!post) {
      const error = new Error("Could't find the post.");
      error.statusCode = 404;
      throw error;
    }

    const likes = await Promise.all(
      post.likes.map(async (person) => {
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

    res.status(200).json({
      message: "List of people that liked the post.",
      likes,
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

const consoleData = (dataName, data) => {
  console.log("\x1b[33m%s\x1b[0m", dataName, data);
};

const getPostsWithImages = async (posts) => {
  return await Promise.all(
    posts.map(async (post) => {
      let imageUrl = "";
      if (post.imageKey) {
        imageUrl = await getObjectSignedUrl(post.imageKey);
      }
      let profilePictureUrl = "";
      if (post.creator.profilePictureKey) {
        profilePictureUrl = await getObjectSignedUrl(
          post.creator.profilePictureKey
        );
      }
      return {
        ...post._doc,
        imageUrl,
        creator: {
          ...post._doc.creator._doc,
          profilePicture: profilePictureUrl,
        },
      };
    })
  );
};
