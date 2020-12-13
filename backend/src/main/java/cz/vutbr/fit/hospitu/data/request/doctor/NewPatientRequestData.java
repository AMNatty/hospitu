package cz.vutbr.fit.hospitu.data.request.doctor;

public class NewPatientRequestData {
    private String username;
    private String password;
    private String name;
    private String surname;
    private String phone;
    private String email;
    private String birthDate;
    private String birthId;
    private int practitionerId;
    private String allergies;
    private String conditions;
    private String gender;

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String getName() {
        return this.name;
    }

    public String getSurname() {
        return this.surname;
    }

    public String getPhone() {
        return this.phone;
    }

    public String getEmail() {
        return this.email;
    }

    public String getBirthDate() {
        return this.birthDate;
    }

    public String getBirthId() {
        return this.birthId;
    }

    public int getPractitionerId() {
        return this.practitionerId;
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

}
