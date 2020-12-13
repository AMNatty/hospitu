package cz.vutbr.fit.hospitu.data.response.impl.doctor;

public class UnPatientsResponseData {
    public int idPatient;
    public String login;
    public String firstName;
    public String lastName;
    public String allergies;
    public String conditions;
    public String gender;
    public int idPractitioner;
    public String practitionerName;
    public String practitionerSurname;

    public UnPatientsResponseData(int idPatient, String login, String firstName, String lastName){
        this.idPatient = idPatient;
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public UnPatientsResponseData(int idPatient, String firstName, String lastName, String allergies, String conditions, String gender, 
    int idPractitioner, String practitionerName, String practitionerSurname ){
        this.idPatient = idPatient;
        this.firstName = firstName;
        this.lastName = lastName;
        this.allergies = allergies;
        this.conditions = conditions;
        this.gender = gender;
        this.idPractitioner = idPractitioner;
        this.practitionerName = practitionerName;
        this.practitionerSurname = practitionerSurname;
    }

    public int getIdPatient() {
        return this.idPatient;
    }

    public String getLogin() {
        return this.login;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public String getAllergies() {
        return this.allergies;
    }

    public String getConditions() {
        return this.conditions;
    }

    public String getGender() {
        return this.gender;
    }

    public int getIdPractitioner() {
        return this.idPractitioner;
    }

    public String getPractitionerName() {
        return this.practitionerName;
    }

    public String getPractitionerSurname() {
        return this.practitionerSurname;
    }
}
