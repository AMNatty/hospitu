package cz.vutbr.fit.hospitu.data.response.impl.doctor;
import cz.vutbr.fit.hospitu.data.response.generic.AbstractGenericCodeResponseData;

public class FileUpdateResponseData extends AbstractGenericCodeResponseData {
    public FileUpdateResponseData()
    {
        super(200, "File Updated.");
    }

}
