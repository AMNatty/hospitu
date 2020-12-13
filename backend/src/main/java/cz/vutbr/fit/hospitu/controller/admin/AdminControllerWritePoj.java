package cz.vutbr.fit.hospitu.controller.admin;

import cz.vutbr.fit.hospitu.data.request.admin.AdminRequest;
import cz.vutbr.fit.hospitu.data.request.admin.AdminRequestDeleteDoctor;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.SQLException;

public class AdminControllerWritePoj {
    public static void getAdmins(Context context)
    {
        var admin_data = context.bodyAsClass(AdminRequest.class); // vytahujes si z pozadavku

        try (var connection = SQLConnection.create())
        {

            String mysql1 = """
            UPDATE users SET us_name=?, us_surname=?, us_login=?, us_perms=? WHERE us_login=?
            """;

            String mysql2 = """
            INSERT INTO insuranceagents(ia_us_id, ia_insurancecompanynumber) VALUES (?, ?)
            """;

            try (var statement = connection.prepareStatement(mysql1))
            {
                statement.setString(1, admin_data.getUs_name());
                statement.setString(2, admin_data.getUs_surname());
                statement.setString(3, admin_data.getUs_login());
                statement.setString(4, admin_data.getUs_perms());
                statement.setString(5, admin_data.getUs_login());

                var result2 = statement.executeUpdate();

            }

            try (var statement = connection.prepareStatement(mysql2))
            {
                statement.setInt(1, admin_data.getCislo_agenta());
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

