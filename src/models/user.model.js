const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schemaEnums = {
  // Schema Selections Object
  // Valid Select Options When Build The GUI
  super: {
    values: ["admin", "user"],
    message: "{VALUE} IS NOT VALID",
  },
};

const schemaOptions = {
  // Schema Options Object
  timestamps: true,
};

const schemaDefinition = {
  username: {
    type: String,
    trim: 1,
    unique: [1, "username '{VALUE}' already exists"],
    minLength: [4, "username '{VALUE}' too short "],
    maxLength: [32, "username '{VALUE}' too long"],
    required: [1, "username is required"],
  },
  first_name: {
    type: String,
    minLength: [2, "First Name {VALUE} too short"],
    maxLength: [24, "First Name {VALUE} too long"],
    required: [1, "first name is required"],
    trim: 1,
  },
  last_name: {
    type: String,
    minLength: [2, "Last Name {VALUE} too short"],
    maxLength: [24, "Last Name {VALUE} too long"],
    required: [1, "last name is required"],
    trim: 1,
  },
  email: {
    type: String,
    lowercase: 1,
    trim: 1,
    unique: [1, "Already Exists"],
    minLength: [10, "Email '{VALUE}' Is Invalid Email"],
    maxLength: [128, "Email '{VALUE}' Is Invalid Email"],
    required: [1, "Email is required"],
  },
  password: {
    type: String,
    trim: 1,
    minLength: [10, "password '{VALUE}' too short"],
    maxLength: [255, "password '{VALUE}' too long"],
    required: [true, "password is required"],
    set: (v) =>
      bcrypt.hashSync(
        `${v}_${process.env.BCRYPT_INJECT}`,
        +process.env.BCRYPT_SALT
      ),
  },
  super: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    trim: 1,
    default: "/uploads/profile_photo/default.png",
  },
  __v: { type: Number, select: 0 },
};

const userSchema = new mongoose.Schema(schemaDefinition, schemaOptions);

userSchema.methods.genAccessToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.SECRET_KEY);
  return token;
};

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(
    `${password}_${process.env.BCRYPT_INJECT}`,
    this.password
  );
};

const UserModel = mongoose.model("User", userSchema);
const userModelFields = Object.keys(UserModel.schema.paths);

module.exports = {
  schemaDefinition,
  userSchema,
  UserModel,
  userModelFields,
};
