const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin.middleware");
const auth = require("../middleware/auth.middleware");
const certificationController = require("../controllers/certification.controller");
const asyncMiddleware = require("../middleware/async.middleware");
const validateMiddleware = require("../middleware/validate.middleware");
const { validate } = require("../model/certification.model");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  upload.single("certificate"),
  auth,
  admin,
  validateMiddleware(validate),
  certificationController.uploadCertificate
);

router.get("/", asyncMiddleware(certificationController.getAllCertificates));

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(certificationController.getCertificateById)
);

router.delete(
  "/:id",
  validateObjectId,
  auth,
  admin,
  asyncMiddleware(certificationController.deleteCertificate)
);

module.exports = router;
