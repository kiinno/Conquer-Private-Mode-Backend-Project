const { validationResult } = require("express-validator");
const Response = require("../utils/response");

/**
 * Validation Resault Middleware
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Middleware
 */
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json(
      new Response(403, {
        validation: errors.array(),
      })
    );
  }
  next();
};
