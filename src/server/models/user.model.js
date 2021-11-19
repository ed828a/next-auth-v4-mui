const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      // required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      // required: true,
      minlength: 8,
      validate(value) {
        if (value.includes("password")) {
          throw new Error("Your password can not contain 'password'!");
        }
      },
    },
    role: {
      type: String,
      // required: true,
      validate(value) {
        if (
          !(
            value.includes("master") ||
            value.includes("admin") ||
            value.includes("editor") ||
            value.includes("subscriber")
          )
        ) {
          throw new Error("must pick up a role for yourself.");
        }
      },
    },
    profile: {
      // profile url
      type: String,
      // required: true,
    },
    avatar: {
      data: { type: 'Buffer' },
      contentType: String,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    receiveAds: {
      type: Boolean,
      default: false,
    },
    rememberMe: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.toJSON = function () {
  console.log('user toJSON method called');
  const user = this;
  const userObject = user.toObject();  
  delete userObject.password;
  delete userObject.avatar;
  console.log('userObject: ', userObject)
  return userObject;
};
// userSchema.options.toJSON = {
//   transform: function (doc, ret, options) {
//     ret.id = ret._id;
//     delete ret.password;
//     ret["avatar"] = undefined;
//     return ret;
//   },
// };

userSchema.methods.generateAuthToken = function () {
  const user = this;
  try {
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: user.rememberMe ? "30d" : "7d" }
    );
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = mongoose.models?.User || mongoose.model("User", userSchema);
