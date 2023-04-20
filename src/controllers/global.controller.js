const asyncHandler = require("express-async-handler");
const Response = require("../utils/response");

/**
 * Get All Documents From This Model
 * @param {*} Model
 * @returns Async-Handler Middleware
 */
module.exports.getDocuments = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const documents = await Model.find();
    res.status(200).json(
      new Response(200, {
        resault: documents,
      })
    );
  });
};

/**
 * Get Specefic Document From The Collection By ID
 * @param {*} Model
 * @returns Async-Handler Middleware
 * @reqParams {ID: ObjectID}
 * @successResponse (200, {resault: document})
 * @failResponse (404, message)
 * @access Admins
 */
module.exports.getSpecificDocument = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    res.status(200).json(new Response(200, { resault: document }));
  });
};

/**
 * Create New Document
 * @param {*} Model
 * @returns Async-Handler Middleware
 * @reqBody Required
 * @successResponse 200 -> OK
 * @access Admins
 */
module.exports.createDocument = (Model) => {
  return asyncHandler(async (req, res, next) => {
    await Model.create(req.body);
    res.sendStatus(200);
  });
};

/**
 * Delete Specefic Document By ID
 * @param {*} Model
 * @returns Async-Handler Middleware
 * @reqParams {ID: ObjectID}
 * @access Admins
 * @successResponse 200 -> OK
 */
module.exports.deleteSpecificDocument = (Model) => {
  return asyncHandler(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  });
};

/**
 * Update Specefic Document By ID
 * @param {*} Model
 * @returns Async-Handler Middleware
 * @reqParams {ID: ObjectID}
 * @access Admins
 * @successResponse (200, {resault: updatedDocument})
 */
module.exports.updateDocument = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(
      new Response(200, {
        resault: document,
      })
    );
  });
};
