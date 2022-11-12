/* external import */
const bcrypt = require("bcryptjs");

/* internal import */
const User = require("../models/User");
const { getToken } = require("../utils/token.util");
const emailUtil = require("../utils/confirm.util");

/* confirmation email utility */
function confirmByEmail(email, token, protocol, host, slug) {
  emailUtil(email, token, protocol, host, slug);
}

/* check expire utility */
function isExpire(date) {
  const expired = new Date() > new Date(date);
  return expired;
}

/* display all users */
/**
 * Nested populate
 * https://www.reddit.com/r/node/comments/9hhd11/mongoose_how_to_populate_nested_schemas_with/
 */
exports.displayAllUsers = async () => {
  const result = User.find()
    .sort([["updatedAt", -1]])
    .populate("transactionInfo.courseID");
  return result;
};

/* sign up an user */
exports.signUpNewUser = async (data, protocol, host) => {
  const user = new User(data);
  const token = user.generateCredentialToken("signup");

  await user.save({ validateBeforeSave: false });
  confirmByEmail(user.email, token, protocol, host, "signup");

  const result = await user.save();
  return result;
};

/* confirm signed up user */
exports.confirmSignedUpUser = async (token) => {
  const user = await User.findOne({ confirmationToken: token });
  const expired = isExpire(user.confirmationTokenExpires);

  if (expired) {
    return { acknowledgement: false };
  }

  user.status = "active";
  user.confirmationToken = undefined;
  user.confirmationTokenExpires = undefined;
  user.save({ validateBeforeSave: false });

  return user;
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
  const result = await User.findOne({ email: data }).populate(
    "transactionInfo.courseID"
  );
  return result;
};

/* display transaction user info */
exports.displayTransactionUser = async (id) => {
  const result = await User.findById(id)?.populate({
    path: "transactionInfo.courseID",
    select: "title category price status",
  });
  return result;
};

/* interact with transaction ID */
exports.interactWithTransaction = async (id, data) => {
  const result = await User.findByIdAndUpdate(id, { $push: data });
  return result;
};

/* update specific user info */
exports.updateSpecificUser = async (id, data) => {
  const result = await User.findByIdAndUpdate(id, data, {
    runValidators: true,
  });
  return result;
};

/* remove specific user */
exports.removeSpecificUser = async (id) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
