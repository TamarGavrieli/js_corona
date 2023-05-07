const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const database= require('./database')
const patient = require('./patients');
const vaccination = require('./vaccination');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
  database: 'CovidSystem'
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


database.create_db();
database.create_patients_table();
database.create_vaccinations_table();

app.post('/ListPatient', (req, res) => {
    if (req.is('json')) {
        const data = req.body;
        for (const name of patient.get_names()) {
            if (!(name in data)) {
                res.status(400).send('Bad Request');
            }
        }
        const new_patient = new patient(
            data['ID'], data['FirstName'], data['LastName'],
            data['City'], data['Street'], data['HouseNumber'],
            data['MobilePhoneNumber'], data['PhoneNumber'],
            data['BirthDate'], data['SickStart'], data['SickEnd']
        );
        try {
            // if (db_instance.get_patient(new_patient.ID) !== null) {
            //     res.status(400).json({ message: 'Patient already exists' });
            // }
            db_instance.add_patient(new_patient);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e.toString() });
        }
        res.status(200).send('OK');
    }
});

app.post('/ListVaccination', (req, res) => {
    if (req.is('json')) {
        const data = req.body;
        for (const name of vaccination.get_names()) {
            if (!(name in data)) {
                res.status(400).send('Bad Request');
            }
        }
        if (data['VaccinationNumber'] > 4 || data['VaccinationNumber'] < 1) {
            res.status(400).json({ message: 'Vaccination number must be between 1 and 4' });
        }
        const new_vaccination = new vaccination(
            data['PatientID'], data['Date'], data['VaccinationNumber']
        );
        try {
            db_instance.add_vaccination(new_vaccination);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e.toString() });
        }
        res.status(200).send('OK');
    }
});

app.get('/GetPatient', (req, res) => {
    try {
        const id = req.query.id;
        const the_patient_raw = db_instance.get_patient(id);
        const pat_names = patient.get_names();
        const the_patient = {};
        for (let x = 0; x < pat_names.length; x++) {
            the_patient[pat_names[x]] = the_patient_raw[x];
        }
        const vaccs = db_instance.get_vaccinations(id);
        if (vaccs === null) {
            the_patient['Vaccinations'] = [];
        } else {
            const the_vaccs = [];
            for (let x = 0; x < vaccs.length; x++) {
                const the_vac = {};
                for (let y = 0; y < vaccination.get_names().length; y++) {
                    the_vac[vaccination.get_names()[y]] = vaccs[x][y];
                }
                the_vaccs.push(the_vac);
            }
            the_patient['Vaccinations'] = the_vaccs;
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.toString() });
    }
    if (patient===null){
      res.status(404).json({ message: e.toString() });
    } 
    res.status(200).json({ the_patient });     
    
  });


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

