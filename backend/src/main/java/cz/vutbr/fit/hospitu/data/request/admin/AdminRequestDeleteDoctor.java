package cz.vutbr.fit.hospitu.data.request.admin;

public class AdminRequestDeleteDoctor {

    private int ptch_id;
    private int ptch_dr_id;
    private String dr_name;
    private String dr_surname;
    private int nahradni_dr_id;
    private int us_id;
    private String us_login;
    private String us_perms;
    private String us_surname;
    private int pojistovna;
    private String pohlavi;

    public int getPtch_dr_id() {
        return ptch_dr_id;
    }

    public int getNahradni_dr_id() {
        return nahradni_dr_id;
    }

    public int getPtch_id() {
        return ptch_id;
    }

    public String getDr_name() {
        return dr_name;
    }

    public String getDr_surname() {
        return dr_surname;
    }

    public int getUs_id() {
        return us_id;
    }

    public String getUs_login() {
        return us_login;
    }

    public String getUs_perms() {
        return us_perms;
    }

    public int getPojistovna() {
        return pojistovna;
    }

    public String getPohlavi() {
        return pohlavi;
    }

    public String getUs_surname() {
        return us_surname;
    }
}
