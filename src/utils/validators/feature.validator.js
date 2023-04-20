const { body } = require("express-validator");

const title = body("title")
  .notEmpty()
  .withMessage("Please Fill This Field")
  .isLength({ min: 2 })
  .withMessage("At Least 2 Characters")
  .isLength({ max: 64 })
  .withMessage("Too Long Maximum 64 Character")
  .toLowerCase()
  .trim();

const description = body("description")
  .notEmpty()
  .withMessage("Please Fill This Field")
  .isLength({ min: 20 })
  .withMessage("At Least 20 Characters")
  .isLength({ max: 128 })
  .withMessage("Too Long Maximum 64 Character")
  .toLowerCase()
  .trim();

module.exports.featureValidationChain = [title, description];
