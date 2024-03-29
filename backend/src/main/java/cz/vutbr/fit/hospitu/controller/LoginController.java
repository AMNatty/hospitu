package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.access.AuthorizationManager;
import cz.vutbr.fit.hospitu.data.request.LoginRequestData;
import cz.vutbr.fit.hospitu.data.response.impl.LoginResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.HumanReadableResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

public class LoginController
{
    public static void postLogin(Context context)
    {
        var loginData = context.bodyAsClass(LoginRequestData.class);

        SQLConnection.createTransaction(context, connection -> {
            var sql = """
            SELECT * FROM users WHERE us_login=? AND us_password=SHA2(CONCAT(?, us_salt), 256)                
            """;

            try (var statement = connection.prepareStatement(sql))
            {
                statement.setString(1, loginData.getUsername());
                statement.setString(2, loginData.getPassword());

                var result = statement.executeQuery();

                if (!result.next())
                {
                    context.status(404).json(new HumanReadableResponseData(404,
                        "A user with these credentials was not found.",
                        "Uživatel s těmito přihlašovacími údaji nebyl nalezen."));
                    return;
                }

                int userID = result.getInt("us_id");

                context.status(200).json(new LoginResponseData(
                    userID,
                    result.getString("us_login"),
                    result.getString("us_name"),
                    result.getString("us_surname"),
                    result.getString("us_perms"),
                    AuthorizationManager.instance().authorize(userID)
                ));
            }
        });
    }
}
