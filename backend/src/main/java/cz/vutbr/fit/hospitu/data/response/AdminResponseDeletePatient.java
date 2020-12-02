package cz.vutbr.fit.hospitu.data.response;

public class AdminResponseDeletePatient {
    int us_id;
    String us_name;
    String us_surname;
    String us_login;
    String us_perms;

    public AdminResponseDeletePatient(int us_id, String us_name, String us_surname, String us_login, String us_perms) {
        this.us_id = us_id;
        this.us_name = us_name;
        this.us_surname = us_surname;
        this.us_login = us_login;
        this.us_perms = us_perms;
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
