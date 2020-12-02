package cz.vutbr.fit.hospitu.data.request;

public class AdminRequestDeleteDoctor {

    private int ptch_id;
    private int ptch_dr_id;
    private int nahradni_dr_id;

    private int us_id;
    private String us_name;
    private String us_surname;
    private String us_login;
    private String us_perms;

    public int getPtch_id() {
        return ptch_id;
    }

    public int getPtch_dr_id() {
        return ptch_dr_id;
    }

    public int getNahradni_dr_id() {
        return nahradni_dr_id;
    }

    public String getUs_surname() {
        return us_surname;
    }

    public int getUs_id() {
        return us_id;
    }

    public String getUs_login() {
        return us_login;
    }

    public String getUs_name() {
        return us_name;
    }

    public String getUs_perms() {
        return us_perms;
    }
}
