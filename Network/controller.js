const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const database= require('../DB/database').Database;
const patient = require('../DB/patients').Patient;
const vaccination = require('../DB/vaccination').Vaccination;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/InsertPatient' ,async (req, res) => {
    try 
    {
        const data = req.body;
        const the_patient=await database.get_patient(data['ID']);
        if (the_patient){
            res.status(400).send('There is a user for this id '+ data['ID'] +' in the system');
            return;

        }
        console.log(data)
        if(patient.get_must_names().some(name=>!data[name])){
           res.status(400).send('Bad Request');
           return;
        }
        if(!isValidDate(data['Birthdate'])){
            res.status(400).json({ message: 'Birthdate must be in correct format' });
            return;
        }
        if (!data['StartSick'] === null&& !data['EndSick'] === null ) {
            if(!isValidDate(data['StartSick'])||!isValidDate(data['EndSick']) ){
                res.status(400).json({ message: 'The date of receiving a positive result and the date of recovery from the disease must be valid' });
                return;
            } return;
        } 

        if(!isValidNumber(data['MobilePhone'])||!isValidNumber(data['Phone'])){
            res.status(400).json({ message: 'MobilePhone and Phone must be in correct format' });
            return;
        }
       
        const new_patient = new patient(
            data['FirstName'], data['LastName'],data['Birthdate'],
            data['City'], data['Street'], data['HomeNumber'],
            data['MobilePhone'], data['Phone'],
            data['StartSick'], data['EndSick'],data['ID']
        );
        console.log(new_patient);
        database.insert_patient(new_patient);
    }       
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e.toString() });
        return;        
    }
    res.status(200).send('OK');
});

app.post('/InsertVaccination' ,async (req, res) => {
    try 
    {
        const data = req.body;
        console.log(data, 'data')
        if(vaccination.get_names().some(name=>!data[name])){
            res.status(400).send('Bad Request');
            return;
        }
        const id=data['PatientID'];
        let the_patient = await database.get_patient(id);
        if (the_patient=== null || the_patient === undefined){
            res.status(400).send('There is no patient with id '+ id +' in the system');
            return;

        }
        let the_vac_number = await database.get_vaccinations_number(id);
        console.log(the_vac_number);
        if (data['VaccinationNumber'] > 4 || data['VaccinationNumber'] < 1) {
            res.status(400).json({ message: 'Vaccination number must be between 1 and 4' });
            return;
        }

        if (the_vac_number=== null || the_vac_number === undefined){
            if (!data['VaccinationNumber']==1){
                res.status(400).send('There is no vaccinations yet, insert vaccination number 1');
                return;
            }
            else{
                console.log(new_vaccination);
                database.insert_vaccination(new_vaccination);
                return;
            }
        }

        if (data['VaccinationNumber'] <= the_vac_number[the_vac_number.length-1].VaccinationNumber) {
            res.status(400).json({ message: 'You already have a number vaccine '+ data['VaccinationNumber'] });
            return;
        }

        if (data['VaccinationNumber'] > the_vac_number[the_vac_number.length-1].VaccinationNumber +1) {
            res.status(400).json({ message: 'You have to insert a number vaccine '+ (the_vac_number[the_vac_number.length-1].VaccinationNumber +1) + ' before a number vaccine ' + (data['VaccinationNumber'])});
            return;
        }
        if (!isValidDate(data['VaccinationDate'])) {
            res.status(400).json({ message: 'Vaccination Date must be in correct format' });
            return;
        }
        if (!vaccination.get_manufacturer().includes(data['Manufacturer'])) {
            res.status(400).json({ message: 'Manufacturer must be one of thses manufacturer: Pfizer, Moderna, Johnson & Johnson' });
            return;
        }


        const new_vaccination = new vaccination(
            data['VaccinationDate'], data['VaccinationNumber'] ,data['PatientID'] ,data['Manufacturer']
        );
        console.log(new_vaccination);
        database.insert_vaccination(new_vaccination);
    }       
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e.toString() });
        return;        
    }
    res.status(200).send('OK');
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
  
/*
  app.get('/GetPatientsNotVac', async (req, res) => {
    try {
        const vaccs = await database.get_patients_not_vac();
        if (vaccs === null||vaccs.length==0) {
            res.status(400).json({ message:'NO pat' });
            return;
        } 
        
    } 
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e.toString() });
    }
    if (vaccination===null){
        res.status(404).json({ message: e.toString() });
    } 
    res.status(200).json({vaccs});     
    
  });
  
  */

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

function isValidDate(dateStr) {
    const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = dateStr.match(dateRegex); 
    if (!match) {
      return false;
    }
    const [, day, month, year] = match;
    const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    if (isNaN(date.getTime())) {
      return false;
    }
    const now = new Date();
    if (date > now) {
      return false;
    } 
    return true;
  }


function isValidNumber(phoneNumber) {
    const israeliPhoneNumberRegex = /^(?:\+972|0)(?:-)?(?:5[02-9]|[2-489])-?(?:\d{7}|\d{3}-\d{4})$/;
    return israeliPhoneNumberRegex.test(phoneNumber);
}
  

app.listen(3005, () => {
    console.log('Server listening on port 3005');
});

  