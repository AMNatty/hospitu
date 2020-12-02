package cz.vutbr.fit.hospitu.data.request;

public class AdminRequestDeletePatient {
    private int us_id;
    private String us_name;
    private String us_surname;
    private String us_login;
    private String us_perms;

    public String getUs_perms() {
        return us_perms;
    }

    public String getUs_name() {
        return us_name;
    }

    public String getUs_login() {
        return us_login;
    }

    public int getUs_id() {
        return us_id;
    }

    public String getUs_surname() {
        return us_surname;
    }
}

