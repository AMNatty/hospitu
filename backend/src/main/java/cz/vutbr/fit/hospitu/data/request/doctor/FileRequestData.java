package cz.vutbr.fit.hospitu.data.request.doctor;

public class FileRequestData {
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
