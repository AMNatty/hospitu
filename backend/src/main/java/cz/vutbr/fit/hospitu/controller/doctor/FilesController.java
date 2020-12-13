package cz.vutbr.fit.hospitu.controller.doctor;

import cz.vutbr.fit.hospitu.data.response.impl.doctor.FileListResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.FileResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.FileUpdateResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.HumanReadableResponseData;
import cz.vutbr.fit.hospitu.data.request.doctor.FileRequestData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;
import java.util.*;

import com.google.protobuf.TextFormat.ParseException;

import java.sql.Date;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;

public class FilesController
{
    public static void getFiles(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT pc.ptch_id,
                pc.ptch_us_id,
                pc.ptch_dr_id,
                pc.ptch_name,
                pc.ptch_description,
                pc.ptch_from,
                pc.ptch_to,
                pc.ptch_finished,
                u.us_name AS patient_first_name,
                u.us_surname AS patient_last_name,
                p.pt_allergies AS patient_allergies,
                p.pt_conditions AS patient_condition,
                p.pt_gender AS patient_gender
            FROM patientcheckups AS pc
                JOIN patients AS p ON p.pt_us_id = pc.ptch_us_id
                JOIN users AS u ON u.us_id = p.pt_us_id
            """;

            try (var statement = connection.prepareStatement(sql))
            {
                var result = statement.executeQuery();

                List <FileResponseData> fileListData = new ArrayList<>();
                while(result.next())
                {
                    int fileID = result.getInt("ptch_id");
                    int patientsID = result.getInt("ptch_us_id");
                    int doctorsID = result.getInt("ptch_dr_id");
                    fileListData.add(new FileResponseData(
                        fileID,
                        patientsID,
                        doctorsID,
                        result.getString("ptch_name"),
                        result.getString("ptch_description"),
                        result.getString("ptch_finished"),
                        result.getString("ptch_from"),
                        result.getString("ptch_to"),
                        result.getString("patient_first_name"),
                        result.getString("patient_last_name"),
                        result.getString("patient_allergies"),
                        result.getString("patient_condition"),
                        result.getString("patient_gender")
                    ));
                }

                context.status(200).json(new FileListResponseData(fileListData));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void getPatient(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT p.pt_us_id, 
            u.us_name AS patient_first_name, 
            u.us_surname AS patient_last_name
            FROM patients AS p
            JOIN users AS u ON u.us_id = p.pt_us_id
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                var result = statement.executeQuery();

                List <FileResponseData> fileListData = new ArrayList<>();
                while(result.next())
                {
                    int patientsID = result.getInt("pt_us_id");
                    fileListData.add(new FileResponseData(
                        patientsID,
                        result.getString("patient_first_name"),
                        result.getString("patient_last_name")
                    ));
                }

                context.status(200).json(new FileListResponseData(fileListData));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void putFiles(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            var fileRequestData = context.bodyAsClass(FileRequestData.class);

            String sql = """
            INSERT INTO patientcheckups(ptch_us_id, ptch_dr_id, ptch_description, ptch_name, ptch_from, ptch_to, ptch_finished)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                statement.setInt(1, fileRequestData.getIdPatient());
                statement.setInt(2, fileRequestData.getIdDoctor());
                statement.setString(3, fileRequestData.getDescription());
                statement.setString(4, fileRequestData.getName());
                statement.setString(5, fileRequestData.getFrom());
                statement.setString(6, fileRequestData.getTo());
                statement.setString(7, fileRequestData.getFinished());


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
            var fileRequestData = context.bodyAsClass(FileRequestData.class);

            String sql = """
            UPDATE patientcheckups
            SET ptch_dr_id = ?
            WHERE ptch_id = ?
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                statement.setInt(1, fileRequestData.getIdDoctor());
                statement.setInt(2, fileRequestData.getIdFile());


                statement.executeUpdate();

            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void updateFile(Context context)
    {
        var targetTicketID = context.pathParam("ptch-id", int.class).getOrNull();

        if (targetTicketID == null)
        {
            context.status(400);
            return;
        }

        updateF(context, targetTicketID);
    }

    public static void updateFileReport(Context context)
    {
        var targetTicketID = context.pathParam("ptch-id", int.class).getOrNull();

        if (targetTicketID == null)
        {
            context.status(400);
            return;
        }

        updateFReport(context, targetTicketID);
    }

    public static void updateF(Context context, int ptchId)
    {
        try (var connection = SQLConnection.create())
        {
            var fileRequestData = context.bodyAsClass(FileRequestData.class);

            Timestamp timeFrom;
            Timestamp timeTo;

            try
            {
                java.text.SimpleDateFormat dateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                java.util.Date parsedFromDate = dateFormat.parse(fileRequestData.getFrom());
                timeFrom = new java.sql.Timestamp(parsedFromDate.getTime());
                java.util.Date parsedToDate = dateFormat.parse(fileRequestData.getTo());
                timeTo = new java.sql.Timestamp(parsedToDate.getTime());
            }
            catch (DateTimeParseException e)
            {
                context.status(403).json(new HumanReadableResponseData(403, "Invalid Date.", "Datum není platné"));
                return;
            }
            catch(java.text.ParseException pe)
            {
                context.status(403).json(new HumanReadableResponseData(403, "Exception.", "Chyba"));
                return;
            }


            String sql = """
            UPDATE patientcheckups
            SET ptch_from = ?, ptch_to = ?, ptch_finished = ?
            WHERE ptch_id = ?
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                statement.setTimestamp(1, timeFrom);
                statement.setTimestamp(2, timeTo);
                statement.setString(3, fileRequestData.getFinished());
                statement.setInt(4, ptchId);


                statement.executeUpdate();

            }

            context.status(200).json(new FileUpdateResponseData());

        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void updateFReport(Context context, int ptchId)
    {
        try (var connection = SQLConnection.create())
        {
            var fileRequestData = context.bodyAsClass(FileRequestData.class);

            String sql = """
            UPDATE patientcheckups
            SET ptch_description = ?
            WHERE ptch_id = ?
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                statement.setString(1, fileRequestData.getDescription());
                statement.setInt(2, ptchId);


                statement.executeUpdate();

            }

            context.status(200).json(new FileUpdateResponseData());

        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }
}
