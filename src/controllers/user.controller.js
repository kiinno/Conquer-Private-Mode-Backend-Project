const { UserModel } = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const Response = require("../utils/response");

module.exports.Login = asyncHandler(async (req, res, next) => {
  const { username, password, email } = req.body;
  const user = await UserModel.findOne({ $or: [{ username }, { email }] });
  if (user && user.verifyPassword(password)) {
    res.status(200).json(new Response(200, { token: user.genAccessToken() }));
  } else next(new Response(500, "Invalid Email Or Password"));
});

module.exports.verifyToken = asyncHandler(async (req, res, next) => {
  res.status(200).json(
    new Response(200, {
      resault: req.auth,
    })
  );
});

module.exports.createNewUser = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const user = await UserModel.create(body);
  res.status(200).json(
    new Response(200, {
      token: user.genAccessToken(),
    })
  );
});

module.exports.updateAuthenticatedUser = asyncHandler(
  async (req, res, next) => {
    await UserModel.findOneAndUpdate(req.auth._id, req.body);
    res.sendStatus(200);
  }
);
