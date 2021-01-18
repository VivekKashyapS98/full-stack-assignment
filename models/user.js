const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tasks: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
      },
      completedAt: {
        type: Date,
      },
      duration: {
        type: String,
      },
      timeRemaining: {
        type: String,
      },
      notes: {
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (userPasswd, next) {
  try {
    let isMatch = await bcrypt.compare(userPasswd, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const user = mongoose.model("user", userSchema);

module.exports = user;
