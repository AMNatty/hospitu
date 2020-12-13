package cz.vutbr.fit.hospitu.controller.admin;

import cz.vutbr.fit.hospitu.data.request.admin.AdminRequestDeleteDoctor;
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
            UPDATE patientcheckups SET ptch_dr_id=? WHERE ptch_id=?
            """;


            String mysql2 = """
            DELETE FROM users WHERE us_name=? AND us_surname=?
            """;

            String mysql3 = """
            DELETE FROM doctors WHERE dr_us_id=?
            """;

            String mysql4 = """
            UPDATE checkupreports SET cr_dr_id=? WHERE cr_id=?
            """;

            try (var statement = connection.prepareStatement(mysql1))
            {
                statement.setInt(1, admin_data.getNahradni_dr_id());
                statement.setInt(2, admin_data.getPtch_id());

                var result2 = statement.executeUpdate();

            }

            try (var statement = connection.prepareStatement(mysql2))
            {
                statement.setString(1, admin_data.getDr_name());
                statement.setString(2, admin_data.getDr_surname());

                var result2 = statement.executeUpdate();

            }

            try (var statement = connection.prepareStatement(mysql3))
            {
                statement.setInt(1, admin_data.getPtch_dr_id());

                var result2 = statement.executeUpdate();

            }

            try (var statement = connection.prepareStatement(mysql4))
            {
                statement.setInt(1, admin_data.getNahradni_dr_id());
                statement.setInt(2, admin_data.getPtch_dr_id());

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
