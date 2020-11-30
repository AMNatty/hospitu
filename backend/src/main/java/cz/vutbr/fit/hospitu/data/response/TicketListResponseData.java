package cz.vutbr.fit.hospitu.data.response;

import java.util.List;

public class TicketListResponseData extends AbstractResponseData {
    private final List<TicketResponseData> ticketListData;

    public TicketListResponseData(List<TicketResponseData> ticketListData){
        super(200);

        this.ticketListData = ticketListData;
    }

    public List<TicketResponseData> getTicketListData() {
        return this.ticketListData;
    }
}
