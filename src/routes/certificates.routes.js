const multer = require("multer");
const express = require("express");
const admin = require("../middleware/admin.middleware");
const auth = require("../middleware/auth.middleware");
const asyncMiddleware = require("../middleware/async.middleware");
const certificatesController = require("../controllers/certificates.controller");
const multerCommon = require("../common/multer.common");
const multerErrorMiddleware = require("../middleware/multerError.middleware");
const { validate, imageSchema } = require("../model/certificates.model");
const validateMiddleware = require("../middleware/validate.middleware");
const validateFileMiddleware = require("../middleware/validateFile.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");

const router = express.Router();
const fileSize = 5;
const upload = multer(multerCommon(multer, fileSize)).single("image");

router.post(
  "/",
  auth,
  admin,
  multerErrorMiddleware(upload, multer, fileSize, "image"),
  validateMiddleware(validate),
  validateFileMiddleware("Image", imageSchema),
  asyncMiddleware(certificatesController.uploadCertificate)
);

router.get("/", asyncMiddleware(certificatesController.getAllCertificates));

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(certificatesController.getCertificateById)
);

router.get(
  "/user/:id",
  validateObjectId,
  asyncMiddleware(certificatesController.getCertificateByUserId)
);

router.delete(
  "/:id",
  validateObjectId,
  auth,
  admin,
  asyncMiddleware(certificatesController.deleteCertificate)
);

module.exports = router;
