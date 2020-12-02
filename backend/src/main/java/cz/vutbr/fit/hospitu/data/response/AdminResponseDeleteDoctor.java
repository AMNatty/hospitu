package cz.vutbr.fit.hospitu.data.response;

public class AdminResponseDeleteDoctor {

    int ptch_id;
    int ptch_dr_id;
    int nahradni_dr_id;
    int us_id;
    String us_name;
    String us_surname;
    String us_login;
    String us_perms;

    public AdminResponseDeleteDoctor(int ptch_id, int ptch_dr_id, int nahradni_dr_id, int us_id, String us_name, String us_surname, String us_login, String us_perms) {
        this.ptch_id = ptch_id;
        this.ptch_dr_id = ptch_dr_id;
        this.nahradni_dr_id = nahradni_dr_id;
        this.us_id = us_id;
        this.us_name = us_name;
        this.us_surname = us_surname;
        this.us_login = us_login;
        this.us_perms = us_perms;
    }

    public int getPtch_dr_id() {
        return ptch_dr_id;
    }

    public int getPtch_id() {
        return ptch_id;
    }

    public int getNahradni_dr_id() {
        return nahradni_dr_id;
    }

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
