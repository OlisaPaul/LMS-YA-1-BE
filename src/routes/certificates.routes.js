const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin.middleware");
const auth = require("../middleware/auth.middleware");
const certificatesController = require("../controllers/certificates.controller");
const asyncMiddleware = require("../middleware/async.middleware");
const validateMiddleware = require("../middleware/validate.middleware");
const { validate, imageSchema } = require("../model/certificates.model");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const multer = require("multer");
const validateFileMiddleware = require("../middleware/validateFile.middleware");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  upload.single("image"),
  auth,
  admin,
  validateMiddleware(validate),
  validateFileMiddleware("Image", imageSchema),
  certificatesController.uploadCertificate
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
