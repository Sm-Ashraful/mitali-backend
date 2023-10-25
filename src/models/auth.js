const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String, // You can define roles like "admin," "user," etc.
    default: "admin", // Default role is "user"
  },
});

// Hash the password before saving it
userSchema.pre("save", function (next) {
  const user = this;

  // Check if the password has been modified; if not, no need to re-hash
  if (!user.isModified("password")) {
    return next();
  }

  // Generate a salt and hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// Compare the entered password with the stored hashed password
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
