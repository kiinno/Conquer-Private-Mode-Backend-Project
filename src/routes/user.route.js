const express = require("express");
const {
  deleteSpecificDocument,
  getDocuments,
  getSpecificDocument,
  updateDocument,
} = require("../controllers/global.controller");
const {
  Login,
  verifyToken,
  createNewUser,
  updateAuthenticatedUser,
} = require("../controllers/user.controller");
const upload = require("../middlewares/upload.middleware");
const { UserModel } = require("../models/user.model");
const auth = require("../middlewares/auth.middleware");
const {
  userAccountValidationChain,
} = require("../utils/validators/user.validator");
const userRouter = express.Router();
const validationResault = require("../middlewares/validation-resault.middleware");
const {
  toOptionalValidators,
  toRequiredValidators,
} = require("../utils/validators/conver-validator");
const {
  ObjectIDParamValidator,
} = require("../utils/validators/global.validator");

userRouter
  .route("/")
  .get(auth.isAuthenticated, auth.isAdmin, getDocuments(UserModel))
  .post(
    upload("image", "profile_photo", 400, 400),
    toRequiredValidators(userAccountValidationChain()),
    validationResault,
    createNewUser
  )
  .put(
    auth.isAuthenticated,
    upload("image", "profile_photo", 400, 400),
    toOptionalValidators(userAccountValidationChain(true)),
    validationResault,
    updateAuthenticatedUser
  );

// Changes For Admins
userRouter
  .route("/:id")
  .get(
    auth.isAuthenticated,
    auth.isAdmin,
    ObjectIDParamValidator(UserModel),
    getSpecificDocument(UserModel)
  )
  .delete(
    auth.isAuthenticated,
    auth.isAdmin,
    ObjectIDParamValidator(UserModel),
    deleteSpecificDocument(UserModel)
  )
  .put(
    auth.isAuthenticated,
    auth.isAdmin,
    ObjectIDParamValidator(UserModel),
    upload("image", "cover", 400, 400),
    updateDocument
  );

userRouter.post("/login", Login);
userRouter.post("/verifytoken", auth.isAuthenticated, verifyToken);

/**
 * User Route
 * @endPoint /user
 */
module.exports = userRouter;
