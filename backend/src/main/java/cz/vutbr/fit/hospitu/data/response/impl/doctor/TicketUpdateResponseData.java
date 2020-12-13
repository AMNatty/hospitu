package cz.vutbr.fit.hospitu.data.response.impl.doctor;
import cz.vutbr.fit.hospitu.data.response.generic.AbstractGenericCodeResponseData;

public class TicketUpdateResponseData extends AbstractGenericCodeResponseData {
    public TicketUpdateResponseData()
    {
        super(200, "Ticket Updated.");
    }
}
