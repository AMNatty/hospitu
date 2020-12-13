package cz.vutbr.fit.hospitu.data.response.impl.doctor;
import cz.vutbr.fit.hospitu.data.response.generic.AbstractGenericCodeResponseData;

public class NewPatientUpdateResponseData extends AbstractGenericCodeResponseData {
    public NewPatientUpdateResponseData(){
        super(200, "Patient created.");
    }
}
