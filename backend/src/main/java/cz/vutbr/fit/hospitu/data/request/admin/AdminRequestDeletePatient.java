package cz.vutbr.fit.hospitu.data.request.admin;

public class AdminRequestDeletePatient {
    private int us_id;
    private String us_login;
    private String us_perms;

    public int getUs_id() {
        return us_id;
    }

    public String getUs_login() {
        return us_login;
    }

    public String getUs_perms() {
        return us_perms;
    }
}

