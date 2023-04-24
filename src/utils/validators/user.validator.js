const { check } = require("express-validator");
const {
  toRequiredValidators,
  toOptionalValidators,
} = require("./conver-validator");
const { UserModel } = require("../../models/user.model");

const superFieldValidator = check("super")
  .optional()
  .isBoolean()
  .withMessage("Invalid Selection Select True Or False")
  .custom((value, { req }) => {
    if (req.auth?.super !== true) {
      throw "You Dont Have Premissions To Made This Action";
    }
    return true;
  });

const userAccountValidationChain = (u = false) => {
  const _v = [
    check("username")
      .isLength({ min: 4 })
      .withMessage("Username, Too Short")
      .isLength({ max: 32 })
      .withMessage("Username, Too Long")
      .custom(async (value, { req }) => {
        if (value.toLowerCase().includes("admin")) {
          throw "Cannot Create Account With This Username.";
        } else {
          const isExists = await UserModel.exists({
            username: value,
          });
          if (isExists) {
            throw "Username Already Used.";
          }
        }
        return true;
      }),

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
      .withMessage("Email, Too Long")
      .custom(async (value, { req }) => {
        const isExists = await UserModel.exists({
          email: value,
        });
        if (isExists) {
          throw "Email Already Exists, Login Now Or Reset Password If You Forgot It";
        }
        return true;
      }),

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
  ];
  return _v;
};

module.exports.createUserValidationChain = toRequiredValidators(
  userAccountValidationChain()
);

module.exports.updateUserValidationChain = [
  ...toOptionalValidators(userAccountValidationChain()),
  superFieldValidator,
];
