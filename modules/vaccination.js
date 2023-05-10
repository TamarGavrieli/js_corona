class Vaccination {
    constructor(VaccinationDate, VaccinationNumber, PatientID) {
      this.VaccinationDate = VaccinationDate;
      this.VaccinationNumber = VaccinationNumber;
      this.PatientID = PatientID;
    }
  
    static get_names() {
      return ["VaccinationDate", "VaccinationNumber", "PatientID"];
    }
  }
  
  module.exports = {
    Vaccination : Vaccination
  }