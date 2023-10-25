const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config/config"); // You'll need to define your own configuration

// Controller for user registration
exports.register = (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });

  user.save((err, newUser) => {
    if (err) {
      return res.status(400).json({ message: "Registration failed" });
    }

    res.status(201).json({ message: "Registration successful", user: newUser });
  });
};

// Controller for user login
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      const token = jwt.sign(
        { _id: user._id, email: user.email },
        config.secret,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        message: "Authentication successful",
        token: token,
      });
    });
  });
};

// Controller for user profile
exports.profile = (req, res) => {
  res.status(200).json({ user: req.user });
};
