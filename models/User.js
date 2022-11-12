const mongoose = require("mongoose");
const crypto = require("crypto");
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
      minLength: [6, "Password would be at least 6 characters"],
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
    transactionInfo: [
      {
        transactionID: {
          type: String,
          default: "xxxxxxxxxx",
        },
        courseID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      },
    ],

    // for user account status
    /**
     * active: verified account
     * inactive: not verified account
     * blocked: account deleted
     */
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "inactive",
    },

    // for user account confirmation token
    confirmationToken: String,
    confirmationTokenExpires: Date,

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

/* generate new user account credential token */
userSchema.methods.generateCredentialToken = function (slug) {
  // generate random token
  const token = crypto.randomBytes(16).toString("hex");

  //   initialize & set up an expiry date <= 1 day
  const date = new Date();
  date.setDate(date.getDate() + 1);

  if (slug === "signup") {
    //   insert token to the confirmation token field
    this.confirmationToken = token;

    // insert expiry to the confirmation token expiry field
    this.confirmationTokenExpires = date;
  } else if (slug === "reset-password") {
    //   insert token to the password reset token field
    this.passwordResetToken = token;

    // insert expiry to the password reset token expiry filed
    this.passwordResetTokenExpires = date;
  }

  return token;
};

userSchema.post("save", async function (next) {
  try {
    console.log("Password encryption successful.");
  } catch (error) {
    next(error);
  }
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
