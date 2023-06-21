const cloudinary = require("cloudinary").v2;
const { Certificate } = require("../model/certificates.model");
const certificateService = require("../services/certificates.services");
const userService = require("../services/user.services");
const { MESSAGES } = require("../common/constants.common");
const { successMessage, errorMessage } = require("../common/messages.common");
const streamifier = require("streamifier");
const task = require("../utils/fawn.utils");

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: "dumzlw4bf",
  api_key: "369185629596499",
  api_secret: "_9gHrTNy7eYHENzp5Tj45Zpoer8",
});

class CertificationController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  async uploadCertificate(req, res) {
    try {
      const { studentId, cohort, learningTrack } = req.body;

      const [[student], certificate] = await Promise.all([
        userService.getStudentById(studentId),
        certificateService.getCertificateByUserId(studentId),
      ]);

      if (!student) return res.status(404).send(errorMessage("student"));

      if (certificate)
        return res.status(400).send({
          success: false,
          message: "Student already has certificate.",
        });

      const fileBuffer = req.file.buffer;

      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "foo",
        },

        async function (error, result) {
          if (error) {
            console.error("Error uploading certificate:", error);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            const certificateUrl = result.secure_url;

            // Create the certificate document and save it to MongoDB
            const certificate = new Certificate({
              studentId,
              cohort,
              learningTrack,
              certificateUrl,
            });

            try {
              // Creating certificate
              task.save("certificates", certificate);

              // Updating user
              task.update(
                "users",
                { _id: student._id },
                {
                  hasCertificate: true,
                }
              );

              // Execute the transaction
              await task.run();
            } catch (error) {
              // Handle error
              console.error(error);
              return res.send({ success: false, message: "Something failed" });
            }

            res.send(successMessage(MESSAGES.CREATED, certificate));
          }
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
    } catch (error) {
      console.error("Error uploading certificate:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
  async getAllCertificates(req, res) {
    const certificates = await certificateService.getAllCertificates();

    // Add the Cloudinary URL to each certificate object
    const certificatesWithUrls = certificates.map((certificate) => {
      return {
        _id: certificate._id,
        cohort: certificate.cohort,
        certificateUrl: certificate.certificateUrl,
      };
    });

    res.send(successMessage(MESSAGES.FETCHED, certificatesWithUrls));
  }

  async getCertificateById(req, res) {
    const certificate = await certificateService.getCertificatesById(
      req.params.id
    );

    if (certificate) {
      res.send(successMessage(MESSAGES.FETCHED, certificate));
    } else {
      res.status(404).send(errorMessage(video, "certificate"));
    }
  }

  async deleteCertificate(req, res) {
    const certificate = await certificateService.getCertificateById(
      req.params.id
    );

    if (!certificate)
      return res.status(404).send(errorMessage(certificate, "certificate"));

    await certificateService.deleteCertificate(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, certificate));
  }
}
module.exports = new CertificationController();
