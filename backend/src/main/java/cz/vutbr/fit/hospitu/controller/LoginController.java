package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.data.LoginData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import cz.vutbr.fit.hospitu.sql.table.Tables;
import io.javalin.http.Context;

import java.sql.SQLException;

public class LoginController
{
    public static void postLogin(Context context)
    {
        var loginData = context.bodyAsClass(LoginData.class);

        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT * FROM $ WHERE us_login=? AND us_password=SHA2(CONCAT(?, us_salt), 256)
            """.replace("$", Tables.TABLE_USERS.getName());

            var statement = connection.prepareStatement(sql);

            statement.setString(1, loginData.getUsername());
            statement.setString(2, loginData.getPassword());

            try (var result = statement.executeQuery())
            {
                if (!result.next())
                {
                    context.status(404);
                    return;
                }

                context.json(result.getInt("us_id"));
                context.status(200);
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }
}
