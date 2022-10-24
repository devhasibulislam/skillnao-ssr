/* external import */
const bcrypt = require("bcryptjs");

/* internal import */
const User = require("../models/User");
const { getToken } = require("../utils/token.util");

/* display all users */
exports.displayAllUsers = async () => {
  const result = User.find();
  return result;
};

/* sign up an user */
exports.signUpNewUser = async (data) => {
  const user = new User(data);
  const result = await user.save();
  return result;
};

/* sign in an user */
exports.signInExistingUser = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (user) {
    const isValidPassword = bcrypt.compareSync(data.password, user.password);
    if (isValidPassword) {
      const token = getToken(user);
      return { user, token };
    } else {
      console.log("Password is wrong!");
    }
  } else {
    console.log("User not exist!");
  }
};

/* retain a user after login based token expiry */
exports.getMe = async (data) => {
  const result = await User.findOne({ email: data });
  return result;
};