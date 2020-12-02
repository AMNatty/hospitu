package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.data.request.AdminRequestDeleteDoctor;
import cz.vutbr.fit.hospitu.data.request.AdminRequestDeletePatient;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.SQLException;

public class AdminControllerDeleteDoctor {

    public static void getAdmins(Context context)
    {
        var admin_data = context.bodyAsClass(AdminRequestDeleteDoctor.class); // vytahujes si z pozadavku

        try (var connection = SQLConnection.create())
        {

            String mysql1 = """
            UPDATE patientcheckups SET ptch_dr_id=?
            """;

            String mysql2 = """
            DELETE FROM users WHERE us_id=?
            """;


            try (var statement = connection.prepareStatement(mysql1))
            {
                statement.setInt(1, admin_data.getNahradni_dr_id());

                var result2 = statement.executeUpdate();

            }

            try (var statement = connection.prepareStatement(mysql2))
            {
                statement.setInt(1, admin_data.getPtch_dr_id());

                var result2 = statement.executeUpdate();

            }



        }

        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }
}
