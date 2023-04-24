const express = require("express");
const featureRoute = express.Router();
const { FeatureModel } = require("../models/feature.model");
const {
  imageHandler,
  multerParser,
} = require("../middlewares/upload.middleware");
const auth = require("../middlewares/auth.middleware");
const validationResault = require("../middlewares/validation-resault.middleware");

const {
  getDocuments,
  createDocument,
  getSpecificDocument,
  deleteSpecificDocument,
  updateDocument,
} = require("../controllers/global.controller");

const {
  featureValidationChain,
} = require("../utils/validators/feature.validator");

const {
  ObjectIDParamValidator,
} = require("../utils/validators/global.validator");

const {
  toRequiredValidators,
  toOptionalValidators,
} = require("../utils/validators/conver-validator");

featureRoute
  .route("/")
  .get(getDocuments(FeatureModel))
  .post(
    auth.isAuthenticated,
    auth.isAdmin,
    multerParser(),
    toRequiredValidators(featureValidationChain()),
    validationResault,
    imageHandler("image", "feature", 400, 400),
    createDocument(FeatureModel)
  );

featureRoute
  .route("/:id")
  .get(
    auth.isAuthenticated,
    auth.isAdmin,
    ObjectIDParamValidator(FeatureModel),
    getSpecificDocument(FeatureModel)
  )
  .delete(
    auth.isAuthenticated,
    auth.isAdmin,
    ObjectIDParamValidator(FeatureModel),
    deleteSpecificDocument(FeatureModel)
  )
  .put(
    auth.isAuthenticated,
    auth.isAdmin,
    multerParser(),
    ObjectIDParamValidator(FeatureModel),
    toOptionalValidators(featureValidationChain()),
    validationResault,
    imageHandler("image", "feature", 400, 400),
    updateDocument(FeatureModel)
  );

/**
 * Features Route
 * @endPoint /feature
 */
module.exports = featureRoute;
