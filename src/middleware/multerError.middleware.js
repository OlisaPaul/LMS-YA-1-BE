module.exports = function (upload, multer, fileSize, fieldName) {
  return (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Handle Multer errors
        if (err.code === "LIMIT_FILE_SIZE") {
          console.log(err);
          return res.status(400).json({
            success: false,
            message: `${err.message}, ${fieldName} size should not be more than ${fileSize} MB`,
          });
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            success: false,
            message: `${err.message}. ${err.field} is not allowed, fieldname should be ${fieldName}`,
          });
        } else {
          return res.status(400).json({ error: "File upload failed" });
        }
      } else if (err) {
        // Handle other non-Multer errors
        return res.status(500).json({ error: "Internal server error" });
      }

      next();
    });
  };
};
