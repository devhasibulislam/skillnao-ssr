const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, provide full name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name would be at most 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Please, provide an email address"],
      validate: [validator.isEmail, "Please, provide valid an email address"],
      unique: [true, "This email exists in our DB, provide a new"],
    },
    password: {
      type: String,
      required: [true, "Please, provide strong password"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough, retry",
      },
    },
    whatsApp: {
      type: String,
      required: [true, "Please, provide valid phone number"],
      validate: {
        validator: (value) =>
          validator.isMobilePhone(value, "bn-BD", { strictMode: true }),
        message: "Phone number {VALUE} is not valid",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} won't allow as a role, try user/admin",
      },
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* middlewares to encrypt password */
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  } catch (error) {
    next(error);
  }
});

userSchema.post("save", async function (next) {
  try {
    console.log("Password encryption successful.");
  } catch (error) {
    next(error);
  }
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
