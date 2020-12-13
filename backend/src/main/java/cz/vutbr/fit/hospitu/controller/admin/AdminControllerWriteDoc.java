package cz.vutbr.fit.hospitu.controller.admin;

import cz.vutbr.fit.hospitu.data.request.admin.AdminRequest;
import cz.vutbr.fit.hospitu.data.request.admin.AdminRequestDeleteDoctor;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.SQLException;

public class AdminControllerWriteDoc {
    public static void getAdmins(Context context)
    {
        var admin_data = context.bodyAsClass(AdminRequest.class); // vytahujes si z pozadavku

        try (var connection = SQLConnection.create())
        {

            String mysql1 = """
            UPDATE users SET us_name=?, us_surname=?, us_login=?, us_perms=? WHERE us_id=?
            """;

            String mysql2 = """
            INSERT INTO doctors(dr_us_id, dr_dp_id, dr_schedulefrom, dr_scheduleto) VALUES (?, ?, ?, ?)
            """;

            try (var statement = connection.prepareStatement(mysql1))
            {
                statement.setString(1, admin_data.getUs_name());
                statement.setString(2, admin_data.getUs_surname());
                statement.setString(3, admin_data.getUs_login());
                statement.setString(4, admin_data.getUs_perms());
                statement.setInt(5, admin_data.getUs_id());

                var result2 = statement.executeUpdate();

            }

            try (var statement = connection.prepareStatement(mysql2))
            {
                statement.setInt(1, admin_data.getUs_id());
                statement.setInt(2, admin_data.getOddeleni());
                statement.setString(3, admin_data.getZacatek_sluzby());
                statement.setString(4, admin_data.getKonec_sluzby());

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

