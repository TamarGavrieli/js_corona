class Patient {
    constructor(FirstName, LastName, Birthdate, City, Street, HomeNumber, MobilePhone, Phone, StartSick, EndSick, ID) {
        
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Birthdate = Birthdate;
        this.City = City;
        this.Street = Street;
        this.HomeNumber = HomeNumber;
        this.MobilePhone = MobilePhone;
        this.Phone = Phone;
        this.StartSick = StartSick;
        this.EndSick = EndSick;
        this.ID = ID;
    }

    static get_names() {
        return ["FirstName", "LastName", "Birthdate", "City", "Street", "HomeNumber", "MobilePhone", "Phone",  "StartSick", "EndSick", "ID"];
    }
    static get_must_names() {
        return ["FirstName", "LastName", "Birthdate", "City", "Street", "HomeNumber", "MobilePhone", "Phone", "ID"];
    }
}

module.exports = {
    Patient : Patient
}