const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const database= require('./database').Database;
const patient = require('./patients').Patient;
const vaccination = require('./vaccination').Vaccination;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/ListPatient', (req, res) => {
    if (req.is('json')) {
        const data = req.body;
        for (const name of patient.get_names()) {
            if (!(name in data)) {
                res.status(400).send('Bad Request');
            }
        }
        const new_patient = new patient(
            data['FirstName'], data['LastName'],data['Birthdate'],
            data['City'], data['Street'], data['HomeNumber'],
            data['MobilePhone'], data['Phone'],
            data['StartSick'], data['EndSick'],data['ID']
        );
        try { database.add_patient(new_patient);
        } 
        catch (e) {
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
            data['VaccinationDate'], data['VaccinationNumber'],data['PatientID']
        );
        try {database.add_vaccination(new_vaccination);
        } 
        
        catch (e) {
            console.log(e);
            res.status(500).json({ error: e.toString() });
        }
        res.status(200).send('OK');
    }
});

app.get('/GetPatient', async (req, res) => {
    let the_patient = {};
    try {
        const id = req.query.id;
        the_patient = await database.get_patient(id);
        const pat_names = patient.get_names();
        const vaccs = await database.get_vaccinations(id);
        if (vaccs === null) {
            the_patient['Vaccinations'] = [];
        } else {
            const the_vaccs = [];
            for (let x = 0; x < vaccs.length; x++) {
                the_vaccs.push(vaccs[x]);
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

    app.listen(3001, () => {
        console.log('Server listening on port 3001');
      });

      /*
    await database.create_db('CovidSystem'); 
    await database.create_db();
    await database.create_patients_table();
    await database.create_vaccinations_table();
 */