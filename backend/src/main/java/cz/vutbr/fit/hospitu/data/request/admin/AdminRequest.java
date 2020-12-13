package cz.vutbr.fit.hospitu.data.request.admin;

public class AdminRequest {
    private int us_id;
    private String us_name;
    private String us_surname;
    private String us_login;
    private String us_perms;
    private String zacatek_sluzby;
    private String konec_sluzby;
    private int oddeleni;
    private int pojistovna;
    private int cislo_agenta;

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

    public String getKonec_sluzby() {
        return konec_sluzby;
    }

    public String getZacatek_sluzby() {
        return zacatek_sluzby;
    }

    public int getOddeleni() {
        return oddeleni;
    }

    public int getPojistovna() {
        return pojistovna;
    }

    public int getCislo_agenta() {
        return cislo_agenta;
    }
}

