package cz.vutbr.fit.hospitu.data.response.impl.doctor;

import cz.vutbr.fit.hospitu.data.response.generic.AbstractGenericCodeResponseData;

public class UnPatientsUpdateResponseData extends AbstractGenericCodeResponseData {
    public UnPatientsUpdateResponseData(){
        super(200, "Patient moved.");
    }
}
