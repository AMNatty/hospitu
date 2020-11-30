package cz.vutbr.fit.hospitu.data.response.impl.doctor;

import cz.vutbr.fit.hospitu.data.response.AbstractResponseData;

import java.util.List;

public class DoctorListResponseData extends AbstractResponseData
{
    private final List<DoctorResponseData> doctorListData;

    public DoctorListResponseData(List<DoctorResponseData> doctorListData){
        super(200);

        this.doctorListData = doctorListData;
    }

    public List<DoctorResponseData> getDoctorListData() {
        return this.doctorListData;
    }
}