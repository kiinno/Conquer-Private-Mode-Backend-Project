const asyncHandler = require("express-async-handler");
const Response = require("../utils/response");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const mongoose = require("mongoose");

/**
 * Check If Authenticated User Have an Admin Premissions
 * @return Middleware
 */
exports.isAdmin = asyncHandler(async (req, res, next) => {
  if (req.auth.super === true) {
    return next();
  }
  next(new Response(403, "Unauthorized"));
});

/**
 * Check If Have Access Token To Make Authentications & Save In Request Object
 * @return Middleware
 */
exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    const token = req.get("x-auth-token");
    const userID = jwt.verify(token, process.env.SECRET_KEY);

    if (mongoose.Types.ObjectId.isValid(userID.id)) {
      const userDoc = await UserModel.findById(userID.id);
      if (userDoc) {
        req.auth = userDoc;
        return next();
      }
    }
    next(new Response(406, "Invalid Authentication"));
  } catch (error) {
    next(new Response(406, "Invalid Authentication"));
  }
});
