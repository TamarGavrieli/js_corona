class Vaccination {
    constructor(PatientID, VaccinationDate, VaccinationNumber) {
      this.PatientID = PatientID;
      this.VaccinationDate = VaccinationDate;
      this.VaccinationNumber = VaccinationNumber;
    }
  
    static get_names() {
      return ["VaccinationDate", "VaccinationNumber", "PatientID"];
    }
  }
  
  module.exports = {
    Vaccination : Vaccination
  }