package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.access.AuthorizationManager;
import cz.vutbr.fit.hospitu.data.response.DoctorListResponseData;
import cz.vutbr.fit.hospitu.data.response.Generic404ResponseData;
import cz.vutbr.fit.hospitu.data.response.DoctorResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import cz.vutbr.fit.hospitu.sql.table.Tables;
import io.javalin.http.Context;
import java.util.*;

import java.sql.SQLException;

public class DoctorController
{
    public static void getDoctorInfo(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT d.dr_us_id, pc.ptch_id, u.us_name AS first_name, u.us_surname AS last_name, 
            uc.uci_phone, uc.uci_email, uc.uci_birthdate,
            uc.uci_birthid, d.dr_schedulefrom, d.dr_scheduleto, de.dp_name AS department_name, 
            de.dp_location AS department_location
            FROM doctors AS d
            JOIN patientcheckups AS pc ON pc.ptch_dr_id = d.dr_us_id
            JOIN users AS u ON u.us_id = d.dr_us_id
            JOIN usercontactinfo AS uc ON uc.uci_us_id = u.us_id
            JOIN departments AS de ON de.dp_id = d.dr_dp_id
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                var result = statement.executeQuery();

                List <DoctorResponseData> doctorListData = new ArrayList<DoctorResponseData>();
                while(result.next())
                {
                    int doctorsID = result.getInt("dr_us_id");
                    int fileID = result.getInt("ptch_id");
                    doctorListData.add(new DoctorResponseData(
                        doctorsID,
                        fileID,
                        result.getString("first_name"),
                        result.getString("last_name"),
                        result.getString("uci_phone"),
                        result.getString("uci_email"),
                        result.getString("uci_birthdate"),
                        result.getString("uci_birthid"),
                        result.getString("dr_schedulefrom"),
                        result.getString("dr_scheduleto"),
                        result.getString("department_name"),
                        result.getString("department_location")
                    ));
                }

                context.status(200).json(new DoctorListResponseData(doctorListData));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void getDoctorFiles(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT d.dr_us_id, pc.ptch_id, u.us_name AS first_name, u.us_surname AS last_name
            FROM doctors AS d
            JOIN patientcheckups AS pc ON pc.ptch_dr_id = d.dr_us_id
            JOIN users AS u ON u.us_id = d.dr_us_id
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                var result = statement.executeQuery();

                List <DoctorResponseData> doctorListData = new ArrayList<DoctorResponseData>();
                while(result.next())
                {
                    int doctorsID = result.getInt("dr_us_id");
                    int fileID = result.getInt("ptch_id");
                    doctorListData.add(new DoctorResponseData(
                        doctorsID,
                        fileID,
                        result.getString("first_name"),
                        result.getString("last_name")
                    ));
                }

                context.status(200).json(new DoctorListResponseData(doctorListData));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }
}
