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
    const response = await fetch('http://localhost:' + port + '/GetVaccinations?id=${patientID}');
    console.log(response.status);
    console.log(await response.text());
}

console.log(getPatient(322533977));

