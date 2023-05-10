const mysql = require('mysql2/promise');

class Database {

    static database = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'mypassword',
        database: 'CovidSystem',
        waitForConnections : true,
        connectionLimit : 10,
        queueLimit : 0
      });

    static async create_db(db_name="CovidSystem") {
        if (await this.check_scheme_exists(db_name)) {
            return;
        }
        await this.database.execute(`create schema ${db_name};`);
    }

    static async create_patients_table() {
        if (await this.check_table_exists("Patients")) {
            return;
        }
        const query = `create table CovidSystem.Patients (    
            FirstName text not null,
            LastName text not null,
            City text null,
            Street text null,
            HomeNumber int null,
            MobilePhone text null,
            Phone text null,
            Birthdate date not null,
            StartSick date null,
            EndSick date null,
            constraint ID primary key (ID)
            
        );`;
        await this.database.query(query);
    }

    static async create_vaccinations_table() {
        if (await this.check_table_exists("Vaccinations")) {
            return;
        }
        const query = `create table CoronaSystem.Vaccinations (
            PatientID varchar(9) not null,
            VaccinationDate date not null,
            VaccinationNumber int not null,
            constraint Vaccinations primary key (PatientID, VaccinationNumber),
            constraint PatientID foreign key (PatientID) references CovidSystem.Patients (ID)
        );`;
        await this.database.query(query);
    }

    static async check_table_exists(table_name, scheme_name="CovidSystem") {
        const [rows] = await Database.database.query(`select table_name from information_schema.tables where table_schema = ? and table_name = ?;`, [scheme_name, table_name]);
        return rows.length !== 0;
    }

    static async check_scheme_exists(scheme_name) {
        const [rows] = await Database.database.query(`select schema_name from information_schema.schemata where schema_name = ?;`, [scheme_name]);
        return rows.length !== 0;
    }


    static async get_patient(ID) {
        const [rows] = await Database.database.query('select * from CovidSystem.Patients where ID = '+ ID +';');
        return rows[0];
    }

    static async get_vaccinations(PatientID) {
        const [rows] = await Database.database.query('select * from CovidSystem.Vaccinations where PatientID = ' + PatientID +';');
        return rows;
    }



    static async get_all_patient() {
        const [rows] = await Database.database.query('select * from CovidSystem.Patients;');
        return rows;
    }

    static async get_all_vaccinations() {
        const [rows] = await Database.database.query('select * from CovidSystem.Vaccinations;');
        return rows;
    }


    static async delete_all_vaccinations() {
        await Database.database.query('DELETE FROM CovidSystem.Vaccinations;');
        
    }


    static async delete_vaccinations(PatientID) {
        await Database.database.query('DELETE FROM CovidSystem.Vaccinations where PatientID = ' + PatientID +';');
        
    }

    static async delete_patients(id) {
        await Database.database.query('DELETE FROM CovidSystem.Patients where ID = ' + id +';');
        
    }


    /**
     * 
     * @param {patient} patient the patient to add to the database
     */

    static async insert_patient(patient) {
        const values = [
            patient.FirstName,
            patient.LastName,
            patient.Birthdate,
            patient.City,
            patient.Street,
            patient.HomeNumber,
            patient.MobilePhone,
            patient.Phone,
            patient.StartSick,
            patient.EndSick,
            patient.ID
          ];
          console.log(patient);

          await Database.database.query('INSERT INTO CovidSystem.Patients (FirstName, LastName,  Birthdate, City, Street, HomeNumber, MobilePhone, Phone, StartSick, EndSick, ID) VALUES \
          (\"'+values[0]+ '\", \"'+ values[1]+ '\", \"'+ values[2]+ '\",\"'+ values[3]+'\", \"'+values[4] +'\", '+ values[5]+ ', \"'+values[6]+ '\", \"'+ values[7]+ '\", \"'+ values[8]+ '\", \"'+ values[9]+ '\",\"'+ values[10]+'\")');
    }



    
    /**
     * 
     * @param {vaccination} vaccination the patient to add to the database
     */

    static async insert_vaccination(vaccination) {
        const values = [
            vaccination.VaccinationDate,
            vaccination.VaccinationNumber,
            vaccination.PatientID
          ];
          console.log(patient, 'patient');

          await Database.database.query('INSERT INTO CovidSystem.Vaccinations (VaccinationDate, VaccinationNumber, PatientID) VALUES \
          (\"'+ values[0]+ '\",'+ values[1]+ ',\"'+ values[2]+'\")');
    }

}

module.exports = {
    Database: Database
}