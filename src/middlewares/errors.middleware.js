const Response = require("../utils/response");

/**
 * Global Route Handler
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return Middleware
 * @route (*)
 */
module.exports.pageNotFound = (req, res, next) => {
  next(new Response(404, "Page Not Found"));
};

/**
 * Request Exceptions Handler For Global Errors
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return Middleware
 */
module.exports.errorHandler = (error, req, res, next) => {
  if (error instanceof Response) {
    res.status(error.statusCode).json(error);
  } else {
    res.status(500).json(
      new Response(500, {
        errors: {
          error: error,
          message: error.message || null,
        },
      })
    );
  }
};
