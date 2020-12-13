package cz.vutbr.fit.hospitu.data.response.impl.doctor;

public class PractitionersResponseData {
    private int idPractitioners;
    private String firstName;
    private String lastName;
    private String workplace;
    private String phone;

    public PractitionersResponseData(int idPractitioners, String firstName, String lastName, String workplace, String phone){
        this.idPractitioners = idPractitioners;
        this.firstName = firstName;
        this.lastName = lastName;
        this.workplace = workplace;
        this.phone = phone;
    }
    
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
