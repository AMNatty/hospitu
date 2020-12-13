package cz.vutbr.fit.hospitu.data.request.doctor;

public class PractitionersRequestData {
    private int idPractitioners;
    private String firstName;
    private String lastName;
    private String workplace;
    private String phone;
    
    public int getIdPractitioners() {
        return this.idPractitioners;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public String getWorkplace() {
        return this.workplace;
    }

    public String getPhone() {
        return this.phone;
    }
    
}
