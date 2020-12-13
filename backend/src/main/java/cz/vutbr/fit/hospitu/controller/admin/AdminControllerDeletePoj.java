package cz.vutbr.fit.hospitu.controller.admin;

import cz.vutbr.fit.hospitu.data.request.admin.AdminRequestDeleteDoctor;
import cz.vutbr.fit.hospitu.data.request.admin.AdminRequestDeletePatient;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.SQLException;

public class AdminControllerDeletePoj {
    public static void getAdmins(Context context)
    {
        var admin_data = context.bodyAsClass(AdminRequestDeleteDoctor.class); // vytahujes si z pozadavku

        try (var connection = SQLConnection.create())
        {

            String mysql1 = """
            DELETE FROM users WHERE us_id=? AND us_login=? AND us_surname=?
            """;

            String mysql2 = """
            DELETE FROM insuranceagents WHERE ia_us_id=? AND ia_insurancecompanynumber=?
            """;

            try (var statement = connection.prepareStatement(mysql1))
            {
                statement.setInt(1, admin_data.getUs_id());
                statement.setString(2, admin_data.getUs_login());
                statement.setString(3, admin_data.getUs_surname());

                var result2 = statement.executeUpdate();

            }
            try (var statement = connection.prepareStatement(mysql2))
            {
                statement.setInt(1, admin_data.getUs_id());
                statement.setInt(2, admin_data.getPojistovna());

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
