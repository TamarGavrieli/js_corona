class Patient {
    constructor(FirstName, LastName, Birthdate, City, Street, HomeNumber, MobilePhone, Phone, StartSick, EndSick, ID) {
        
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Birthdate = Birthdate;
        this.City = City;
        this.Street = Street;
        this.HomeNumber = HomeNumber;
        this.MobilePhoneNumber = MobilePhone;
        this.PhoneNumber = Phone;
        this.StartSick = StartSick;
        this.EndSick = EndSick;
        this.ID = ID;
    }

    static get_names() {
        return ["FirstName", "LastName", "Birthdate", "City", "Street", "HomeNumber", "MobilePhone", "Phone",  "StartSick", "EndSick", "ID"];
    }
}

module.exports = {
    Patient : Patient
}