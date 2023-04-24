const sharp = require("sharp");
const multer = require("multer");
const Response = require("../utils/response");
const asyncHandler = require("express-async-handler");
const path = require("path");
const upload = multer({
  limits: {
    fileSize: 3_000_000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png||jpg||jpeg)$/)) {
      return cb(
        new Response(
          400,
          `Image Type ${file.mimetype} Is Not, Allowed (png, jpg, jpeg)`
        )
      );
    }
    cb(null, true);
  },
});

module.exports.multerParser = (fieldName = "image") => {
  return upload.single(fieldName);
};

/**
 * Create Images Upload Handler
 * @param {*} fieldName
 * @param {*} distFolder
 * @param {*} width -> 250
 * @param {*} height -> 250
 * @param {*} dbFieldName
 * @returns HOF -> Middleware
 */
module.exports.imageHandler = (
  fieldName,
  distFolder,
  width = 250,
  height = 250,
  dbFieldName
) => {
  return asyncHandler(async (req, res, next) => {
    if (req.file) {
      const fileName = `${Date.now()}-${Math.trunc(Math.random() * 1e7)}.png`;
      const dest = path.join(__dirname, `../uploads/${distFolder}`, fileName);
      await sharp(req.file.buffer)
        .resize({
          width,
          height,
        })
        .png()
        .toFile(dest);
      req.body[dbFieldName || fieldName] = `/uploads/${distFolder}/${fileName}`;
    }
    return next();
  });
};
