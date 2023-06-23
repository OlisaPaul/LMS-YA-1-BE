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
    }).populate("studentId");
  }

  async getCertificateByUserId(studentId) {
    return await Certificate.findOne({
      studentId: studentId,
    }).populate("studentId");
  }

  async getAllCertificates() {
    return await Certificate.find().populate("studentId");
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
