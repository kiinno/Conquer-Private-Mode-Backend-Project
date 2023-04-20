const { check } = require("express-validator");
const { UserModel } = require("../../models/user.model");
const username = check("username")
  .isLength({ min: 4 })
  .withMessage("Username, Too Short")
  .isLength({ max: 32 })
  .withMessage("Username, Too Long");

const first_name = check("first_name")
  .isLength({ min: 2 })
  .withMessage("First Name, Too Short")
  .isLength({ max: 15 })
  .withMessage("First Name, Too Long");

const last_name = check("last_name")
  .isLength({ min: 2 })
  .withMessage("Last Name, Too Short")
  .isLength({ max: 15 })
  .withMessage("Last Name, Too Long");

const email = check("email")
  .isEmail({ host_whitelist: ["hotmail.com", "gmail.com", "yahoo.com"] })
  .normalizeEmail()
  .withMessage("Domain Is Not Allowed")
  .isLength({ max: 100 })
  .withMessage("Email, Too Long");

const password = check("password")
  .isLength({ min: 10 })
  .withMessage("Password, Too Short Must Be at Least 10 Characters")
  .isLength({ max: 32 })
  .withMessage("Password, Too Long Maximum 32 Character")
  .custom((value, { req }) => {
    if (req.body.confirm_password === value) {
      return true;
    } else throw new Error("Password Dose Not Matched");
  });

const superF = check("super")
  .custom((value, { req }) => {
    if (req.auth.super === true) {
      return true;
    } else throw new Error("Unauthorized To Made This Action");
  })
  .isBoolean()
  .withMessage("Invalid Selection Select True Or False");

module.exports.userAccountValidation = [
  first_name,
  last_name,
  username,
  email,
  password,
];

module.exports.updateAccountValidation = [
  first_name,
  last_name,
  username,
  email,
  password,
  superF,
];
