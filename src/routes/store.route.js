const express = require("express");

const {
  getDocuments,
  createDocument,
  getSpecificDocument,
  deleteSpecificDocument,
  updateDocument,
} = require("../controllers/global.controller");

const auth = require("../middlewares/auth.middleware");
const { StoreModel } = require("../models/store.model");
const {
  imageHandler,
  multerParser,
} = require("../middlewares/upload.middleware");
const validationResault = require("../middlewares/validation-resault.middleware");

const {
  ObjectIDParamValidator,
} = require("../utils/validators/global.validator");

const {
  toOptionalValidators,
  toRequiredValidators,
} = require("../utils/validators/conver-validator");

const {
  createStoreItemValidationChain,
} = require("../utils/validators/store.validator");

const storeRoute = express.Router();

storeRoute
  .route("/")
  .get(getDocuments(StoreModel))
  .post(
    auth.isAuthenticated,
    auth.isAdmin,
    multerParser(),
    toRequiredValidators(createStoreItemValidationChain()),
    validationResault,
    imageHandler("image", "store", 400, 400),
    createDocument(StoreModel)
  );

storeRoute
  .route("/:id")
  .get(
    auth.isAuthenticated,
    auth.isAdmin,
    ObjectIDParamValidator(StoreModel),
    getSpecificDocument(StoreModel)
  )
  .delete(
    auth.isAuthenticated,
    auth.isAdmin,
    ObjectIDParamValidator(StoreModel),
    deleteSpecificDocument(StoreModel)
  )
  .put(
    auth.isAuthenticated,
    auth.isAdmin,
    ObjectIDParamValidator(StoreModel),
    multerParser(),
    toOptionalValidators(createStoreItemValidationChain()),
    validationResault,
    imageHandler("image", "store", 400, 400),
    updateDocument(StoreModel)
  );

/**
 * Store Route
 * @endPoint /store
 */
module.exports = storeRoute;
