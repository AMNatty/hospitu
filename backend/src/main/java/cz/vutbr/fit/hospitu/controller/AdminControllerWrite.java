package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.data.request.AdminRequestDeleteDoctor;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.SQLException;

public class AdminControllerWrite {
    public static void getAdmins(Context context)
    {
        var admin_data = context.bodyAsClass(AdminRequestDeleteDoctor.class); // vytahujes si z pozadavku

        try (var connection = SQLConnection.create())
        {

            String mysql = """
            UPDATE users SET us_name=?, us_surname=?, us_login=?, us_perms=? WHERE us_id=?
            """;

            try (var statement = connection.prepareStatement(mysql))
            {
                statement.setString(1, admin_data.getUs_name());
                statement.setString(2, admin_data.getUs_surname());
                statement.setString(3, admin_data.getUs_login());
                statement.setString(4, admin_data.getUs_perms());
                statement.setInt(5, admin_data.getUs_id());

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

