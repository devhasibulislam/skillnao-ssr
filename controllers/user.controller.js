/* internal import */
const userService = require("../services/user.service");

/* display all users */
exports.displayAllUsers = async (req, res, next) => {
  try {
    const result = await userService.displayAllUsers();

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "User successfully fetched from DB",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* sign up an user */
exports.signUpNewUser = async (req, res, next) => {
  try {
    const result = await userService.signUpNewUser(
      req.body,
      req.protocol,
      req.get("host")
    );

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "User signed up successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* confirm signed up user */
exports.confirmSignedUpUser = async (req, res, next) => {
  try {
    const user = await userService.confirmSignedUpUser(req.query.token);

    if (user.acknowledgement === false) {
      return res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description: "Email provided token expired. Please, retry",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Account activated, ready to go",
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* sign in an user */
exports.signInExistingUser = async (req, res, next) => {
  try {
    const result = await userService.signInExistingUser(req.body);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "User signed in successfully",
      redirect: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* retain a user after login based token expiry */
exports.getMe = async (req, res, next) => {
  try {
    const { email } = req.user;
    const result = await userService.getMe(email);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "User persist successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display transaction user */
exports.displayTransactionUser = async (req, res, next) => {
  try {
    const result = await userService.displayTransactionUser(req.params.id);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Successfully fetch transaction user information",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* interact with transaction ID */
exports.interactWithTransaction = async (req, res, next) => {
  try {
    const result = await userService.interactWithTransaction(
      req.params.id,
      req.body
    );

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully upsert transaction information",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* update specific user */
exports.updateSpecificUser = async (req, res, next) => {
  try {
    const result = await userService.updateSpecificUser(
      req.params.id,
      req.body
    );

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully updated user info",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* remove specific user */
exports.removeSpecificUser = async (req, res, next) => {
  try {
    const result = await userService.removeSpecificUser(req.params.id);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully remove specified user",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
