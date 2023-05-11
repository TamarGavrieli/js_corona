class Vaccination {
    constructor(VaccinationDate, VaccinationNumber, PatientID, Manufacturer) {
      this.VaccinationDate = VaccinationDate;
      this.VaccinationNumber = VaccinationNumber;
      this.PatientID = PatientID;
      this.Manufacturer=Manufacturer;
    }
  
    static get_names() {
      return ["VaccinationDate", "VaccinationNumber","PatientID", "Manufacturer"];
    }
    static get_manufacturer() {
      return ["Pfizer", "Moderna", "Johnson & Johnson"];
    }
  }
  
  module.exports = {
    Vaccination : Vaccination
  }