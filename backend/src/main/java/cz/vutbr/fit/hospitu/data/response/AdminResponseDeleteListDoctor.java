package cz.vutbr.fit.hospitu.data.response;

import java.util.ArrayList;
import java.util.List;

public class AdminResponseDeleteListDoctor extends AbstractResponseData{
    List<AdminResponse> admin_response = new ArrayList<>();

    public AdminResponseDeleteListDoctor(List<AdminResponse> admin_response) {
        super(200);
        this.admin_response = admin_response;
    }

    public List<AdminResponse> getAdmin_response() {
        return admin_response;
    }
}
