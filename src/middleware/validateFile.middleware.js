module.exports = (fileType, fileTypeValidator) => {
  return (req, res, next) => {
    if (!req.file) {
      // No file was provided in the request
      return res
        .status(400)
        .json({ success: false, message: `${fileType} file is required.` });
    }

    const { error } = fileTypeValidator.validate(req.file);

    if (error) {
      // Handle validation error
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    // File is valid, continue to the next middleware
    next();
  };
};
