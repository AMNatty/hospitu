package cz.vutbr.fit.hospitu.data.request.doctor;

public class UnPatientRequestData {
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
