const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Response = require("../response");

module.exports.ObjectIDParamValidator = (Model) => {
  return expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const collectionName = Model.collection.collectionName;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const check = await Model.exists({ _id: id });
      if (!check)
        return next(
          new Response(400, `ID '${id}' Is Not Exists On ${collectionName}`)
        );
    } else {
      return next(new Response(400, `Invalid ID '${id}' Format`));
    }
    next();
  });
};
