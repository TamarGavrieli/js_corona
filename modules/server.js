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
        } 
        else 
        {
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


  app.get('/GetVaccinations', async (req, res) => {
    let the_vac = {};
    try {
        const id = req.query.patientID;
        console.log(id);
        const vac_names = vaccination.get_names();
        const vaccs = await database.get_vaccinations(id);
        if (vaccs === null) {
            the_vac['Vaccinations'] = [];
        } else {
            const the_vaccs = [];
            for (let x = 0; x < vaccs.length; x++) {
                the_vaccs.push(vaccs[x]);
            }
            the_vac = the_vaccs;
        }
    } 
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e.toString() });
    }
    if (vaccination===null){
        res.status(404).json({ message: e.toString() });
    } 
    res.status(200).json({the_vac});     
    
  });


  
  app.get('/GetAllPatient', async (req, res) => {
    console.log('2');
    let the_patient = {};
    try {
        the_patient = await database.get_all_patient();
        const pat_names = patient.get_names();
        if (pat_names === null) {
            the_patient = [];
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

  app.get('/GetAllVaccinations', async (req, res) => {
    console.log('2');
    let the_vac = {};
    try {
        the_vac = await database.get_all_vaccinations();
        const vac_names = vaccination.get_names();
        if (vac_names === null) {
            the_vac = [];
        } 
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.toString() });
    }
    if (patient===null){
      res.status(404).json({ message: e.toString() });
    } 
    res.status(200).json({ the_vac });     
    
  });


  
  app.delete('/DeleteAllVaccinations', async (req, res) => {
    console.log('Deleting table');  
    try {
      await database.delete_all_vaccinations();
      res.status(200).json({ message:'Table deleted successfully' });
    } 
    catch (e) {
      console.log(e);
      res.status(500).json({ error: e.toString() });
    }
  });
  

  
  app.delete('/DeleteVaccinations', async (req, res) => { 
    try {

      const id = req.query.patientID;
      console.log(id);
      const vaccs = await database.get_vaccinations(id);
      console.log(vaccs);
      if (vaccs.length === 0) {
        console.log('No vaccinations for the patient '+id);
       }  
       else {
        await database.delete_vaccinations(id);
        console.log('The vaccinations of patient '+ id + ' have been deleted') ;  
       }   
    } 
    catch (e) {
      console.log(e);
      res.status(500).json({ error: e.toString() });
    }
});


app.delete('/DeletePatient', async (req, res) => { 
    try {
      const id = req.query.id;
      console.log(id);
      the_patient = await database.get_patient(id);
      //const pat_names = patient.get_names();
      //console.log(the_patient);
      if (the_patient.length === 0) {
        console.log('No patient with the id '+id);
       }  
       else {
        await database.delete_vaccinations(id);
        await database.delete_patients(id);
        console.log('The patient with id '+ id + ' have been deleted') ;  
       }   
    } 
    catch (e) {
      console.log(e);
      res.status(500).json({ error: e.toString() });
    }
});














app.listen(3001, () => {
    console.log('Server listening on port 3001');
});

    