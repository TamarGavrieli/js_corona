const database= require('./database')
const patient = require('./patients');
const vaccination = require('./vaccination');

const port = 3005

async function insert_patient(firstName, lastName, birthdate, city, street,homeNumber, mobilePhone, phone, startSick, endSick, id){
    const body = {
        'FirstName': firstName,
        'LastName': lastName,
        'Birthdate': birthdate,
        'City': city,
        'Street': street,
        'HomeNumber': homeNumber,
        'MobilePhone': mobilePhone,
        'Phone': phone,
        'StartSick': startSick,
        'EndSick': endSick,
        'ID': id
    }
    const response = await fetch('http://localhost:' + port + '/InsertPatient', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),});
    console.log(response.status);
    console.log(await response.text());
}


async function insert_vaccination(vaccinationDate, vaccinationNumber, patientID){
    const body = {
        'VaccinationDate': vaccinationDate,
        'VaccinationNumber':  vaccinationNumber,
        'PatientID': patientID
    }
    const response = await fetch('http://localhost:' + port + '/InsertVaccination', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),});
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
    const response = await fetch('http://localhost:' + port + '/GetAllPatient');
    console.log(response.status);
    console.log(await response.text());
}



async function getAllVaccination() {
    const response = await fetch('http://localhost:' + port + '/GetAllVaccinations');
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



async function deleteAllVaccination() {
    const response = await fetch('http://localhost:' + port + '/DeleteAllVaccinations');
    console.log(response.status);
    console.log(await response.text());
}



console.log(insert_vaccination( '01.03.2020', 5, 55555));

