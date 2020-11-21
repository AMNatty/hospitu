package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.data.request.LoginRequestData;
import cz.vutbr.fit.hospitu.data.response.Generic404ResponseData;
import cz.vutbr.fit.hospitu.data.response.LoginResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import cz.vutbr.fit.hospitu.sql.table.Tables;
import io.javalin.http.Context;

import java.sql.SQLException;

public class LoginController
{
    public static void postLogin(Context context)
    {
        var loginData = context.bodyAsClass(LoginRequestData.class);

        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT * FROM $ WHERE us_login=? AND us_password=SHA2(CONCAT(?, us_salt), 256)
            """.replace("$", Tables.TABLE_USERS.getName());

            try (var statement = connection.prepareStatement(sql))
            {
                statement.setString(1, loginData.getUsername());
                statement.setString(2, loginData.getPassword());

                var result = statement.executeQuery();

                if (!result.next())
                {
                    context.status(404).json(new Generic404ResponseData("A user with these credentials was not found."));
                    return;
                }

                context.status(200).json(new LoginResponseData(
                        result.getInt("us_id"),
                        result.getString("us_login"),
                        result.getString("us_name"),
                        result.getString("us_surname")
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
