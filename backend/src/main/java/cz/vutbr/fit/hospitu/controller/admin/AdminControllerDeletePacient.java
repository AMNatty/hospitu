package cz.vutbr.fit.hospitu.controller.admin;

import cz.vutbr.fit.hospitu.data.request.admin.AdminRequestDeleteDoctor;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.SQLException;

public class AdminControllerDeletePacient {

    public static void getAdmins(Context context)
    {
        var admin_data = context.bodyAsClass(AdminRequestDeleteDoctor.class); // vytahujes si z pozadavku

        try (var connection = SQLConnection.create())
        {

            String mysql1 = """
            DELETE FROM users WHERE us_login=? AND us_id=?
            """;

            String mysql2 = """
            DELETE FROM patients WHERE pt_us_id=? AND pt_gender=?
            """;

            try (var statement = connection.prepareStatement(mysql1))
            {
                statement.setString(1, admin_data.getUs_login());
                statement.setInt(2, admin_data.getUs_id());

                var result2 = statement.executeUpdate();

            }

            try (var statement = connection.prepareStatement(mysql2))
            {
                statement.setInt(1, admin_data.getUs_id());
                statement.setString(2, admin_data.getPohlavi());

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
