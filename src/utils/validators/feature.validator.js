const { body } = require("express-validator");

module.exports.featureValidationChain = () => {
  return [
    body("title")
      .isLength({ min: 2 })
      .withMessage("At Least 2 Characters")
      .isLength({ max: 64 })
      .withMessage("Too Long Maximum 64 Character")
      .toLowerCase()
      .trim(),
    body("description")
      .isLength({ min: 20 })
      .withMessage("At Least 20 Characters")
      .isLength({ max: 128 })
      .withMessage("Too Long Maximum 64 Character")
      .toLowerCase()
      .trim(),
  ];
};
