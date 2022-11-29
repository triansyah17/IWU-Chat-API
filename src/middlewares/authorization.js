const userModel = require("../models/user.model");
const { failed } = require("../utils/createResponse");

module.exports = {
  isVerified: async (req, res, next) => {
    try {
      const user = await userModel.findBy("email", req.body.email);

      if (!user.rowCount) {
        next();
      } else if (user.rows[0].is_verified) {
        next();
      } else {
        failed(res, {
          code: 401,
          payload: "Your email is not verified yet",
          message: "Unauthorized",
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
};
