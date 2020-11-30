package cz.vutbr.fit.hospitu.data.request;

public class DoctorRequestData {

    private int idDoctor;
    private int idFile;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String birthDate;
    private String birthId;
    private String scheduleFrom;
    private String scheduleTo;
    private String departmentName;
    private String departmentLocation;

    public int getIdDoctor() {
        return this.idDoctor;
    }

    public int getIdFile() {
        return this.idFile;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
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

    public String getScheduleFrom() {
        return this.scheduleFrom;
    }

    public String getScheduleTo() {
        return this.scheduleTo;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public String getDepartmentLocation() {
        return this.departmentLocation;
    }
}