const { Certificate } = require("../model/certificates.model");

class CertificationService {
  //Create new certificate
  async createCertificate(certificate) {
    return await certificate.save();
  }

  async getCertificateById(certificateId) {
    return await Certificate.findOne({
      _id: certificateId,
      isDeleted: undefined,
    });
  }

  async getCertificateByUserId(studentId) {
    return await Certificate.findOne({
      studentId: studentId,
    });
  }

  async getAllCertificates() {
    return await Certificate.find();
  }

  async updateCertificateById(id, certificate) {
    return await Certificate.findByIdAndUpdate(
      id,
      {
        $set: certificate,
      },
      { new: true }
    );
  }

  async deleteCertificate(id) {
    return await Certificate.findByIdAndRemove(id);
  }
}

module.exports = new CertificationService();
