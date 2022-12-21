const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/authController");
const User = require("../models/User");

//  /auth/{route}
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("Email adress already exists!");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
    body("username").trim().not().isEmpty(),
  ],
  authController.register
);
router.post("/login", authController.login);

module.exports = router;
