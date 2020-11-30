package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.access.AuthorizationManager;
import cz.vutbr.fit.hospitu.data.response.FileListResponseData;
import cz.vutbr.fit.hospitu.data.response.Generic404ResponseData;
import cz.vutbr.fit.hospitu.data.response.FileResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import cz.vutbr.fit.hospitu.sql.table.Tables;
import io.javalin.http.Context;
import java.util.*;

import java.sql.SQLException;

public class FilesController
{
    public static void getFiles(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT pc.ptch_id, pc.ptch_us_id, pc.ptch_dr_id, pc.ptch_name, pc.ptch_description, pc.ptch_from, pc.ptch_to, pc.ptch_finished,
            u.us_name AS patient_first_name, u.us_surname AS patient_last_name,p.pt_allergies AS patient_allergies,
            p.pt_conditions AS patient_condition, p.pt_gender AS patient_gender
            FROM patientcheckups AS pc
            JOIN patients AS p ON p.pt_pc_id = pc.ptch_id
            JOIN users AS u ON u.us_id = p.pt_us_id
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                var result = statement.executeQuery();

                List <FileResponseData> fileListData = new ArrayList<FileResponseData>();
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
            SELECT p.pt_us_id, pc.ptch_id, u.us_name AS patient_first_name, 
            u.us_surname AS patient_last_name
            FROM patients AS p
            JOIN patientcheckups AS pc ON pc.ptch_us_id = p.pt_us_id
            JOIN users AS u ON u.us_id = p.pt_us_id
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                var result = statement.executeQuery();

                List <FileResponseData> fileListData = new ArrayList<FileResponseData>();
                while(result.next())
                {
                    int fileID = result.getInt("ptch_id");
                    int patientsID = result.getInt("pt_us_id");
                    fileListData.add(new FileResponseData(
                        fileID,
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
}
