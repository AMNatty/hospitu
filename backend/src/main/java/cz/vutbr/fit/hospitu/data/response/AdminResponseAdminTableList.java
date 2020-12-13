package cz.vutbr.fit.hospitu.data.response;

import java.util.ArrayList;
import java.util.List;

public class AdminResponseAdminTableList extends AbstractResponseData{
    List<AdminResponseAdminTable> admin_response = new ArrayList<>();

    public AdminResponseAdminTableList(List<AdminResponseAdminTable> admin_response) {
        super(200);
        this.admin_response = admin_response;
    }

    public List<AdminResponseAdminTable> getAdmin_response() {
        return admin_response;
    }
}
