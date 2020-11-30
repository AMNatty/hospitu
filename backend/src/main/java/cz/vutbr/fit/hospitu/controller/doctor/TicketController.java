package cz.vutbr.fit.hospitu.controller.doctor;

import cz.vutbr.fit.hospitu.data.response.impl.doctor.TicketListResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.TicketResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;
import java.util.*;

import java.sql.SQLException;

public class TicketController {
    public static void getTickets(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT cr.cr_id,
                cr.cr_dr_id, 
                cr.cr_ptch_id, 
                cr.cr_name, 
                cr.cr_performed, 
                cr.cr_report,
                cr.cr_price
            FROM checkupreports AS cr
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                var result = statement.executeQuery();

                List <TicketResponseData> ticketListData = new ArrayList<>();
                while(result.next())
                {
                    int ticketID = result.getInt("cr_id");
                    int doctorsID = result.getInt("cr_dr_id");
                    int fileID = result.getInt("cr_ptch_id");
                    ticketListData.add(new TicketResponseData(
                        ticketID,
                        doctorsID,
                        fileID,
                        result.getString("cr_name"),
                        result.getString("cr_performed"),
                        result.getString("cr_report"),
                        result.getString("cr_price")
                    ));
                }

                context.status(200).json(new TicketListResponseData(ticketListData));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }
}
