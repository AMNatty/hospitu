package cz.vutbr.fit.hospitu.data.response;

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