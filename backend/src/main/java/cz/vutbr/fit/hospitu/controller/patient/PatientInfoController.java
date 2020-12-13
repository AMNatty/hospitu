package cz.vutbr.fit.hospitu.controller.patient;

import cz.vutbr.fit.hospitu.access.APIAccessManager;
import cz.vutbr.fit.hospitu.data.response.impl.patient.PatientInfoResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.SQLException;

public class PatientInfoController
{
    public static void getPatientSelfInfo(Context context)
    {
        var selfUser = APIAccessManager.getUser(context);

        // 401 should be handled by the access manager
        if (selfUser.isEmpty())
            return;

        var userID = selfUser.getAsInt();

        try (var connection = SQLConnection.create())
        {
            var sql = """
            SELECT 
                pc_name,
                pc_surname,
                pc_workplace,
                pc_phone,
                pt_allergies,
                pt_conditions,
                pt_gender                
            FROM patients 
                LEFT JOIN practitioners p on patients.pt_pc_id = p.pc_id
            WHERE pt_us_id=?
            """;

            try (var statement = connection.prepareStatement(sql))
            {
                statement.setInt(1, userID);

                var result = statement.executeQuery();

                if (!result.next())
                {
                    context.status(404).json(PatientInfoResponseData.empty());
                    return;
                }

                context.status(200).json(PatientInfoResponseData.of(
                    result.getString("pc_name"),
                    result.getString("pc_surname"),
                    result.getString("pc_workplace"),
                    result.getString("pc_phone"),
                    result.getString("pt_allergies"),
                    result.getString("pt_condition"),
                    result.getString("pt_gender")
                ));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }
}
