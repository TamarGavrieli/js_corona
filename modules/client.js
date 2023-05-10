const database= require('./database')
const patient = require('./patients');
const vaccination = require('./vaccination');






const port = 3001

async function add_patient(patt){
    const body = {
        'FirstName': patt.FirstName,
        'LastName': patt.LastName,
        'City': patt.City,
        'Street': patt.Street,
        'HomeNumber': patt.HomeNumber,
        'MobilePhone': patt.MobilePhone,
        'Phone': patt.Phone,
        'Birthdate': patt.Birthdate,
        'StartSick': patt.StartSick,
        'EndSick': patt.EndSick,
        'ID': patt.ID
    }

    const response = await fetch('http://localhost:' + port + '/ListPatient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(response.status);
  console.log(await response.text());
}


async function add_vaccination(vacc){
    const body = {
        'VaccinationDate': vacc.VaccinationDate,
        'VaccinationNumber': vacc.VaccinationNumber,
        'PatientID': vacc.PatientID
    }

    const response = await fetch('http://localhost:' + port + '/ListVaccination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(response.status);
  console.log(await response.text());
}

async function getPatient(id) {
    const response = await fetch('http://localhost:' + port + '/GetPatient?id=' + id);
    console.log(response.status);
    console.log(await response.text());
}
  

async function getVaccination(patientID) {
    const response = await fetch('http://localhost:' + port + '/GetVaccinations?patientID=' + patientID);
    console.log(response.status);
    console.log(await response.text());
}

async function getAllPatient() {
    console.log('1');
    const response = await fetch('http://localhost:' + port + '/GetAllPatient');
    console.log(response.status);
    console.log(await response.text());
}



async function getAllVaccination() {
    const response = await fetch('http://localhost:' + port + '/GetAllVaccinations');
    console.log(response.status);
    console.log(await response.text());
}


async function deleteAllVaccination() {
    const response = await fetch('http://localhost:' + port + '/DeleteAllVaccinations');
    console.log(response.status);
    console.log(await response.text());
}


async function deleteVaccination(patientID) {
    const response = await fetch('http://localhost:' + port + '/DeleteVaccinations?patientID=' + patientID,   {method: 'DELETE'});
    console.log(response);
    console.log(response.status);
}




async function deletePatient(id) {
    const response = await fetch('http://localhost:' + port + '/DeletePatient?id=' + id,   {method: 'DELETE'});
    console.log(response);
    console.log(response.status);
}
console.log(deletePatient(123456789));
