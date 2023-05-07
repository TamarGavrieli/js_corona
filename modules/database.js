const mysql = require('mysql2/promise');

class Database {

    static database = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mypassword',
        database: 'CovidSystem'
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
        await this.database.execute(query);
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
        await this.database.execute(query);
    }

    static async add_patient(patient) {
        const query = `insert into CovidSystem.Patients (
            FirstName,
            LastName,
            City,
            Street,
            HomeNumber,
            MobilePhone,
            Phone,
            Birthdate,
            StartSick,
            EndSick,
            ID
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        await this.database.execute(query, [
             patient.FirstName, patient.LastName, patient.City, patient.Street, patient.HomeNumber,
            patient.MobilePhone, patient.Phone, patient.Birthdate, patient.StartSick, patient.EndSick,patient.ID
        ]);
    }

    static async add_vaccination(vaccination) {
        const query = `insert into CovidSystem.Vaccinations (
            VaccinationDate,
            VaccinationNumber,
            PatientID
        ) values (?, ?, ?);`;
        await this.database.execute(query, [vaccination.VaccinationDate, vaccination.VaccinationNumber, vaccination.PatientID]);
    }

    static async check_table_exists(table_name, scheme_name="CovidSystem") {
        const [rows] = await this.database.execute(`select table_name from information_schema.tables where table_schema = ? and table_name = ?;`, [scheme_name, table_name]);
        return rows.length !== 0;
    }

    static async check_scheme_exists(scheme_name) {
        const [rows] = await this.database.execute(`select schema_name from information_schema.schemata where schema_name = ?;`, [scheme_name]);
        return rows.length !== 0;
    }

    static async get_patient(ID) {
        const [rows] = await this.database.execute(`select * from CovidSystem.Patients where ID = ?;`, [ID]);
        return rows[0];
    }

    static async get_vaccinations(PatientID) {
        const [rows] = await this.database.execute(`select * from CovidSystem.Vaccinations where PatientID = ?;`, [PatientID]);
        return rows;
    }



    static async get_all_patient(ID) {
        const [rows] = await this.database.execute(`select * from CovidSystem.Patients where ID = ?;`, [ID]);
        return rows[0];
    }

    static async get_all_vaccinations(PatientID) {
        const [rows] = await this.database.execute(`select * from CovidSystem.Vaccinations where PatientID = ?;`, [PatientID]);
        return rows;
    }
}
