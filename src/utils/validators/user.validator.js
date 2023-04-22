const { check } = require("express-validator");
const { UserModel } = require("../../models/user.model");

module.exports.userAccountValidationChain = (u = false) => {
  const superFieldValidator = check("super")
    .custom((value, { req }) => {
      if (req.auth?.super !== true) {
        req.body.super = false;
      }
      return true;
    })
    .isBoolean()
    .withMessage("Invalid Selection Select True Or False");

  const _v = [
    check("username")
      .isLength({ min: 4 })
      .withMessage("Username, Too Short")
      .isLength({ max: 32 })
      .withMessage("Username, Too Long"),

    check("password")
      .isLength({ min: 10 })
      .withMessage("Password, Too Short Must Be at Least 10 Characters")
      .isLength({ max: 32 })
      .withMessage("Password, Too Long Maximum 32 Character")
      .custom((value, { req }) => {
        if (req.body.confirm_password === value) {
          return true;
        } else throw new Error("Password Dose Not Matched");
      }),

    check("email")
      .isEmail({ host_whitelist: ["hotmail.com", "gmail.com", "yahoo.com"] })
      .normalizeEmail()
      .withMessage("Domain Is Not Allowed")
      .isLength({ max: 100 })
      .withMessage("Email, Too Long"),

    check("first_name")
      .isLength({ min: 2 })
      .withMessage("First Name, Too Short")
      .isLength({ max: 15 })
      .withMessage("First Name, Too Long"),

    check("last_name")
      .isLength({ min: 2 })
      .withMessage("Last Name, Too Short")
      .isLength({ max: 15 })
      .withMessage("Last Name, Too Long"),
    superFieldValidator,
  ];
  return _v;
};
