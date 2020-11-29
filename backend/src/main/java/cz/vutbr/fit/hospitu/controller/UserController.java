package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.access.APIAccessManager;
import cz.vutbr.fit.hospitu.access.EnumAPIRole;
import cz.vutbr.fit.hospitu.data.response.Generic403ResponseData;
import cz.vutbr.fit.hospitu.data.response.Generic404ResponseData;
import cz.vutbr.fit.hospitu.data.response.UserResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.SQLException;

public class UserController
{
    public static void getUserProfile(Context context)
    {
        var targetUserID = context.pathParam("user-id", int.class).getOrNull();

        if (targetUserID == null)
        {
            context.status(400);
            return;
        }

        getProfile(context, targetUserID);
    }

    public static void getSelfUserProfile(Context context)
    {
        var selfUser = APIAccessManager.getUser(context);

        // 401 should be handled by the access manager
        if (selfUser.isEmpty())
            return;

        getProfile(context, selfUser.getAsInt());
    }

    private static void getProfile(Context context, int targetUserID)
    {
        var selfUser = APIAccessManager.getUser(context);

        try (var connection = SQLConnection.create())
        {
            var sql = """
            SELECT * FROM users WHERE us_id=?
            """;

            try (var statement = connection.prepareStatement(sql))
            {
                statement.setInt(1, targetUserID);

                var result = statement.executeQuery();

                if (!result.next())
                {
                    context.status(404).json(new Generic404ResponseData("User not found."));
                    return;
                }

                var targetUserRole = result.getString("us_perms");
                var targetUserType = EnumAPIRole.getByDBName(targetUserRole);

                if (targetUserType == null)
                {
                    context.status(500);
                    return;
                }

                if (selfUser.isEmpty())
                {
                    if (targetUserType != EnumAPIRole.DOCTOR)
                    {
                        context.status(403).json(new Generic403ResponseData("Anonymous users can only view profiles of doctors."));
                        return;
                    }
                }
                else
                {
                    var selfUserID = selfUser.getAsInt();
                    var selfUserType = APIAccessManager.getRole(selfUserID);

                    if (selfUserType == EnumAPIRole.PATIENT && targetUserType != EnumAPIRole.DOCTOR && selfUserID != targetUserID)
                    {
                        context.status(403).json(new Generic403ResponseData("Patients can only view profiles of doctors."));
                        return;
                    }
                }

                context.status(200).json(new UserResponseData(
                    result.getInt("us_id"),
                    result.getString("us_login"),
                    result.getString("us_name"),
                    result.getString("us_surname"),
                    targetUserRole
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
