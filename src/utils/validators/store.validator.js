const { check } = require("express-validator");

module.exports.createStoreItemValidationChain = () => {
  return [
    check("title")
      .isLength({ min: 2 })
      .withMessage("At Least 2 Characters")
      .isLength({ max: 64 })
      .withMessage("Too Long Maximum 64 Character"),
    check("description")
      .isLength({ min: 20 })
      .withMessage("At Least 20 Characters")
      .isLength({ max: 128 })
      .withMessage("Too Long Maximum 64 Character"),
    check("price").custom((value, { req }) => {
      const v = +value;
      console.log(v);
      const check = !isNaN(v);

      if (check) {
        if (!(v >= 0)) {
          throw "is less than minimum allowed value 0";
        }
      } else {
        throw "Must Be A Number";
      }
      return true;
    }),
  ];
};
