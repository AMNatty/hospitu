package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.sql.SQLConnection;
import cz.vutbr.fit.hospitu.sql.table.Tables;
import io.javalin.http.Context;

import java.sql.SQLException;

public class UserController
{
    public static void getUser(Context context)
    {
        var userID = context.pathParam("user-id", int.class).getOrNull();

        if (userID == null)
        {
            context.status(400);
            return;
        }

        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT * FROM $ WHERE us_id=?
            """.replace("$", Tables.TABLE_USERS.getName());

            var statement = connection.prepareStatement(sql);
            statement.setInt(1, userID);

            try (var result = statement.executeQuery())
            {
                if (!result.next())
                {
                    context.status(404);
                    return;
                }

                context.json(String.format("%s %s", result.getString("us_name"), result.getString("us_surname")));
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
