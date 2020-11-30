package cz.vutbr.fit.hospitu.data.response;

public class FileResponseData
{
    private int idFile;
    private int idPatient;
    private int idDoctor;
    private String name;
    private String description;
    private String finished;
    private String from;
    private String to;
    private String patientFirstName;
    private String patientLastName;
    private String patientAllergies;
    private String patientCondition;
    private String patientGender;

    public FileResponseData(int idFile, int idPatient, int idDoctor, String name, String description, String finished, String from, String to, 
    String patientFirstName, String patientLastName, String patientAllergies, String patientCondition, String patientGender){
        this.idFile = idFile;
        this.idPatient = idPatient;
        this.idDoctor = idDoctor;
        this.name = name;
        this.description = description;
        this.finished = finished;
        this.from = from;
        this.to = to;
        this.patientFirstName = patientFirstName;
        this.patientLastName = patientLastName;
        this.patientAllergies = patientAllergies;
        this.patientCondition = patientCondition;
        this.patientGender = patientGender;
    }

    public FileResponseData(int idFile, int idPatient, String patientFirstName, String patientLastName){
        this.idFile = idFile;
        this.idPatient = idPatient;
        this.patientFirstName = patientFirstName;
        this.patientLastName = patientLastName;
    }

    public int getIdFile() {
        return this.idFile;
    }

    public int getIdDoctor() {
        return this.idDoctor;
    }

    public int getIdPatient() {
        return this.idPatient;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public String getFinished() {
        return this.finished;
    }

    public String getFrom() {
        return this.from;
    }

    public String getTo() {
        return this.to;
    }

    public String getPatientFirstName() {
        return this.patientFirstName;
    }

    public String getPatientLastName() {
        return this.patientLastName;
    }
    
    public String getPatientAllergies() {
        return this.patientAllergies;
    }

    public String getPatientCondition() {
        return this.patientCondition;
    }

    public String getPatientGender() {
        return this.patientGender;
    }
}