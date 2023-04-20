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

const price = body("price")
  .notEmpty()
  .withMessage("Please Fill This Field")
  .custom((value, { req }) => {
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
  });

module.exports.storeItemValidationChain = [title, description, price];
