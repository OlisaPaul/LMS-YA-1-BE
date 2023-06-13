const cloudinary = require("cloudinary").v2;
const { Certificate } = require("../model/certificates.model");
const certificateService = require("../services/certificates.services");
const { MESSAGES } = require("../common/constants.common");
const { successMessage, errorMessage } = require("../common/messages.common");
const streamifier = require("streamifier");

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
      const { name, cohort, learningTrack } = req.body;
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
              name,
              cohort,
              learningTrack,
              certificateUrl,
            });
            await certificateService.createCertificate(certificate);

            res.send({ message: MESSAGES.FETCHED, certificate });
          }
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
    } catch (error) {
      console.error("Error uploading certificate:", error);
      res.status(500).json({ error: "Internal Server Error" });
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
