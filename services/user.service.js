/* external import */
const bcrypt = require("bcryptjs");

/* internal import */
const User = require("../models/User");

/* display all users */
exports.displayAllUsers = async () => {
  const result = User.find({});
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
      console.log("Password is correct!");
      return user;
    } else {
      console.log("Password is wrong!");
    }
  } else {
    console.log("User not exist!");
  }
};
