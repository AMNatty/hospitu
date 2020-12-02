package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.data.request.AdminRequestDeleteDoctor;
import cz.vutbr.fit.hospitu.data.request.AdminRequestDeletePatient;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.SQLException;

public class AdminControllerDeletePatient {
    public static void getAdmins(Context context)
    {
        var admin_data = context.bodyAsClass(AdminRequestDeleteDoctor.class); // vytahujes si z pozadavku

        try (var connection = SQLConnection.create())
        {

            String mysql = """
            DELETE FROM users WHERE us_id=? AND us_name=? AND us_surname=? AND us_login=? AND us_perms=?
            """;

            if (admin_data.getUs_perms() == "DOCTOR" || admin_data.getUs_perms() == "ADMIN") {
                return;
            }

            try (var statement = connection.prepareStatement(mysql))
            {
                statement.setInt(1, admin_data.getUs_id());
                statement.setString(2, admin_data.getUs_name());
                statement.setString(3, admin_data.getUs_surname());
                statement.setString(4, admin_data.getUs_login());
                statement.setString(5, admin_data.getUs_perms());

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
