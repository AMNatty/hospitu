package cz.vutbr.fit.hospitu.data.request;

public class TicketRequestData {
    public int idTicket;
    public int idDoctor;
    public int idFile;
    public String name;
    public String performed;
    public String report;
    public String price;

    public int getIdTicket() {
        return this.idTicket;
    }

    public int getIdDoctor() {
        return this.idDoctor;
    }

    public int getIdFile() {
        return this.idFile;
    }

    public String getName() {
        return this.name;
    }

    public String getPerformed() {
        return this.performed;
    }

    public String getReport() {
        return this.report;
    }

    public String getPrice() {
        return this.price;
    }
}
