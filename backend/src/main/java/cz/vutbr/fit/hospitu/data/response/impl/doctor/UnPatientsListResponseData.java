package cz.vutbr.fit.hospitu.data.response.impl.doctor;

import cz.vutbr.fit.hospitu.data.response.AbstractResponseData;

import java.util.List;

public class UnPatientsListResponseData extends AbstractResponseData {
    final private List<UnPatientsResponseData> unPatientsResponseData;

    public UnPatientsListResponseData(List<UnPatientsResponseData> unPatientsResponseData){
        super(200);
        this.unPatientsResponseData = unPatientsResponseData;
    }

    public List<UnPatientsResponseData> getUnPatientsResponseData() {
        return this.unPatientsResponseData;
    }
}
