/**
 * Title: Create token
 * Description: Create token with respect user login credentials
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external import */
const jwt = require("jsonwebtoken");

exports.getToken = (data) => {
  const token = jwt.sign(
    {
      name: data.fullName,
      email: data.email,
      contactNumber: data.contactNumber,
      role: data.role,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.DURATION_EXPIRY,
    }
  );

  return token;
};
