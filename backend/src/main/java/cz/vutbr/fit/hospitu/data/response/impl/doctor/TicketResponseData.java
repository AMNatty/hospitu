package cz.vutbr.fit.hospitu.data.response.impl.doctor;

public class TicketResponseData {
    public int idTicket;
    public int idDoctor;
    public int idFile;
    public String name;
    public String performed;
    public String report;
    public String price;

    public TicketResponseData(int idTicket, int idDoctor, int idFile, String name, String performed, 
    String report, String price){
        this.idTicket = idTicket;
        this.idDoctor = idDoctor;
        this.idFile = idFile;
        this.name = name;
        this.performed = performed;
        this.report = report;
        this.price = price;
    }

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
