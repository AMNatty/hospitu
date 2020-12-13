package cz.vutbr.fit.hospitu.controller.doctor;

import cz.vutbr.fit.hospitu.data.response.generic.Generic404ResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.RegistrationResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.HumanReadableResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.TicketListResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.TicketResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.TicketUpdateResponseData;
import cz.vutbr.fit.hospitu.data.request.doctor.TicketRequestData;
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

    public static void putTickets(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            var ticketRequestData = context.bodyAsClass(TicketRequestData.class);

            String sql = """
            INSERT INTO checkupreports(cr_dr_id, cr_ptch_id, cr_name, cr_performed, cr_report, cr_price)
            VALUES (?, ?, ?, ?, ?, ?);
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                statement.setInt(1, ticketRequestData.getIdDoctor());
                statement.setInt(2, ticketRequestData.getIdFile());
                statement.setString(3, ticketRequestData.getName());
                statement.setString(4, ticketRequestData.getPerformed());
                statement.setString(5, ticketRequestData.getReport());
                statement.setString(6, ticketRequestData.getPrice());


                statement.executeUpdate();

            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void putIRequest(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            var ticketRequestData = context.bodyAsClass(TicketRequestData.class);

            String sql = """
            INSERT INTO insurancerequests(ir_cr_id)
            VALUES (?);
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                statement.setInt(1, ticketRequestData.getIdTicket());


                statement.executeUpdate();

            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void putChangeDoctor(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            var ticketRequestData = context.bodyAsClass(TicketRequestData.class);

            String sql = """
            UPDATE checkupreports
            SET cr_dr_id = ?
            WHERE cr_id = ?
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                statement.setInt(1, ticketRequestData.getIdDoctor());
                statement.setInt(2, ticketRequestData.getIdTicket());


                statement.executeUpdate();

            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void updateFileTicket(Context context)
    {
        var targetTicketID = context.pathParam("cr-id", int.class).getOrNull();

        if (targetTicketID == null)
        {
            context.status(400);
            return;
        }

        updateTicket(context, targetTicketID);
    }

    public static void updateFileTicketReport(Context context)
    {
        var targetTicketID = context.pathParam("cr-id", int.class).getOrNull();

        if (targetTicketID == null)
        {
            context.status(400);
            return;
        }

        updateTicketReport(context, targetTicketID);
    }

    public static void updateTicket(Context context, int crId)
    {
        try (var connection = SQLConnection.create())
        {
            var ticketRequestData = context.bodyAsClass(TicketRequestData.class);

            String sql = """
            UPDATE checkupreports
            SET cr_performed = ?, cr_price = ?
            WHERE cr_id = ?
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                statement.setString(1, ticketRequestData.getPerformed());
                statement.setString(2, ticketRequestData.getPrice());
                statement.setInt(3, crId);


                statement.executeUpdate();

            }

            context.status(200).json(new TicketUpdateResponseData());

        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void updateTicketReport(Context context, int crId)
    {
        try (var connection = SQLConnection.create())
        {
            var ticketRequestData = context.bodyAsClass(TicketRequestData.class);

            String sql = """
            UPDATE checkupreports
            SET cr_report = ?
            WHERE cr_id = ?
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                statement.setString(1, ticketRequestData.getReport());
                statement.setInt(2, crId);


                statement.executeUpdate();

            }

            context.status(200).json(new TicketUpdateResponseData());

        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }
}
