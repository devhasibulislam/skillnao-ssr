/**
 * Title: Error handler
 * Description: A handler that represent all errors
 * Author: Hasibul Islam
 * Date: 23/10/2022
 */

module.exports = (err, req, res, next) => {
  res.status(500).json({
    acknowledgement: false,
    message: err.name,
    description: err.message,
  });
};
