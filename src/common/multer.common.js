module.exports = (multer, size) => {
  return {
    storage: multer.memoryStorage(),
    limits: {
      fileSize: size * 1024 * 1024,
    },
  };
};
