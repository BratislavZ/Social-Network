const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const { getObjectSignedUrl } = require("../helpers/s3");

exports.login = async (req, res, next) => {
  const mail = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: mail });
    if (!user) {
      const error = new Error("Could't find the user.");
      error.statusCode = 404;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3h" }
    );

    let profilePictureUrl = "";
    if (user.profilePictureKey) {
      profilePictureUrl = await getObjectSignedUrl(user.profilePictureKey);
    }

    const { _id, email, username, ...other } = user._doc;
    res.status(200).json({
      token,
      user: { _id, email, username, profilePicture: profilePictureUrl },
    });
  } catch (err) {
    catchHandler(next, err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePictureKey: "",
      coverPictureKey: "",
      followers: [],
      followings: [],
      city: "",
      from: "",
      gender: "",
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created.", userId: savedUser._id });
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
