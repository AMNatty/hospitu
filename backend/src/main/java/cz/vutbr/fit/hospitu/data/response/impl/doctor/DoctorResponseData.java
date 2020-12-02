package cz.vutbr.fit.hospitu.data.response.impl.doctor;

public class DoctorResponseData {

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

    public DoctorResponseData(int idDoctor, int idFile, String firstName, String lastName, String phone, 
    String email, String birthDate, String birthId, String scheduleFrom, String scheduleTo, 
    String departmentName, String departmentLocation){
        this.idDoctor = idDoctor;
        this.idFile = idFile;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.birthDate = birthDate;
        this.birthId = birthId;
        this.scheduleFrom = scheduleFrom;
        this.scheduleTo = scheduleTo;
        this.departmentName = departmentName;
        this.departmentLocation = departmentLocation;
    }

    public DoctorResponseData(int idDoctor, int idFile, String firstName, String lastName){
        this.idDoctor = idDoctor;
        this.idFile = idFile;
        this.firstName = firstName;
        this.lastName = lastName;
    }

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