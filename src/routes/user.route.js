const express = require("express");
const userRouter = express.Router();

const auth = require("../middlewares/auth.middleware");
const {
  imageHandler,
  multerParser,
} = require("../middlewares/upload.middleware");
const { UserModel } = require("../models/user.model");
const validationResault = require("../middlewares/validation-resault.middleware");

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

const {
  createUserValidationChain,
  updateUserValidationChain,
} = require("../utils/validators/user.validator");

const {
  ObjectIDParamValidator,
} = require("../utils/validators/global.validator");

userRouter
  .route("/")
  .get(auth.isAuthenticated, auth.isAdmin, getDocuments(UserModel))
  .post(
    multerParser(),
    createUserValidationChain,
    validationResault,
    imageHandler("image", "profile_photo", 400, 400),
    createNewUser
  )
  .put(
    auth.isAuthenticated,
    multerParser(),
    updateUserValidationChain,
    validationResault,
    imageHandler("image", "profile_photo", 400, 400),
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
    multerParser(),
    updateUserValidationChain,
    validationResault,
    imageHandler("image", "profile_photo", 400, 400),
    updateDocument
  );

userRouter.post("/login", Login);
userRouter.post("/verifytoken", auth.isAuthenticated, verifyToken);

/**
 * User Route
 * @endPoint /user
 */
module.exports = userRouter;
