package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.access.APIAccessManager;
import cz.vutbr.fit.hospitu.access.EnumAPIRole;
import cz.vutbr.fit.hospitu.controller.validator.BasicValidator;
import cz.vutbr.fit.hospitu.controller.validator.UserValidator;
import cz.vutbr.fit.hospitu.data.request.ProfileUpdateRequestData;
import cz.vutbr.fit.hospitu.data.response.generic.Generic403ResponseData;
import cz.vutbr.fit.hospitu.data.response.generic.Generic404ResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.ExtendedUserResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.ProfileUpdateResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.UserResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.HumanReadableResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;

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


    public static void getUserProfileDetail(Context context)
    {
        var targetUserID = context.pathParam("user-id", int.class).getOrNull();

        if (targetUserID == null)
        {
            context.status(400);
            return;
        }

        getDetailProfile(context, targetUserID);
    }

    public static void getSelfUserProfileDetail(Context context)
    {
        var selfUser = APIAccessManager.getUser(context);

        // 401 should be handled by the access manager
        if (selfUser.isEmpty())
            return;

        getDetailProfile(context, selfUser.getAsInt());
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

    private static void getDetailProfile(Context context, int targetUserID)
    {
        try (var connection = SQLConnection.create())
        {
            var sql = """
            SELECT us_id, 
                us_login, 
                us_salt,
                us_password,
                us_name, 
                us_surname, 
                us_perms,
                uci_birthdate,
                uci_birthid,
                uci_email,
                uci_phone
            FROM users 
                LEFT JOIN usercontactinfo u on users.us_id = u.uci_us_id
            WHERE us_id=?
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

                context.status(200).json(new ExtendedUserResponseData(
                    result.getInt("us_id"),
                    result.getString("us_login"),
                    result.getString("us_name"),
                    result.getString("us_surname"),
                    result.getString("us_perms"),
                    result.getString("uci_birthdate"),
                    result.getString("uci_birthid"),
                    result.getString("uci_email"),
                    result.getString("uci_phone")
                ));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void updateUserProfile(Context context)
    {
        var targetUserID = context.pathParam("user-id", int.class).getOrNull();

        if (targetUserID == null)
        {
            context.status(400);
            return;
        }

        updateProfile(context, targetUserID);
    }

    public static void updateSelfUserProfile(Context context)
    {
        var selfUser = APIAccessManager.getUser(context);

        // 401 should be handled by the access manager
        if (selfUser.isEmpty())
            return;

        updateProfile(context, selfUser.getAsInt());
    }

    private static void updateProfile(Context context, int id)
    {
        var profileUpdateRequestData = context.bodyAsClass(ProfileUpdateRequestData.class);

        LocalDate parsedDate;

        try
        {
            parsedDate = LocalDate.parse(profileUpdateRequestData.getBirthDate());
        }
        catch (DateTimeParseException e)
        {
            context.status(403).json(new HumanReadableResponseData(403, "Invalid birthDate.", "Datum narození není platné"));
            return;
        }

        var name = UserValidator.validateName(context, profileUpdateRequestData.getName());
        var surname = UserValidator.validateSurname(context, profileUpdateRequestData.getSurname());
        var birthDate = Date.valueOf(parsedDate);
        var birthID  = BasicValidator.validateText(context, "birthID", profileUpdateRequestData.getBirthID(), 10, 15,  "rodné číslo");
        var email = BasicValidator.validateText(context, "email", profileUpdateRequestData.getEmail(), 5, 50,  "e-mail");
        var phone = BasicValidator.validateText(context, "phone", profileUpdateRequestData.getPhone(), 1, 20,  "telefonní číslo");

        SQLConnection.createTransaction(context, connection -> {
            var findExistingSql = """
            SELECT uci_us_id FROM usercontactinfo WHERE uci_us_id=?
            """;

            try (var statement = connection.prepareStatement(findExistingSql))
            {
                statement.setInt(1, id);

                var result = statement.executeQuery();

                if (!result.next())
                {
                    var insertSql = """
                        INSERT INTO usercontactinfo(uci_us_id, uci_phone, uci_email, uci_birthdate, uci_birthid) VALUES (?, ?, ?, ?, ?)
                        """;

                    try (var stat = connection.prepareStatement(insertSql))
                    {
                        stat.setInt(1, id);
                        stat.setString(2, phone);
                        stat.setString(3, email);
                        stat.setDate(4, birthDate);
                        stat.setString(5, birthID);

                        stat.executeUpdate();
                    }
                }
                else
                {
                    var insertSql = """
                        UPDATE usercontactinfo SET uci_phone=?, uci_email=?, uci_birthdate=?, uci_birthid=?
                        WHERE uci_us_id=?
                        """;

                    try (var stat = connection.prepareStatement(insertSql))
                    {
                        stat.setString(1, phone);
                        stat.setString(2, email);
                        stat.setDate(3, birthDate);
                        stat.setString(4, birthID);
                        stat.setInt(5, id);

                        stat.executeUpdate();
                    }
                }
            }

            var updateSql = """
            UPDATE users SET us_name=?, us_surname=?
            WHERE us_id=?
            """;

            try (var statement = connection.prepareStatement(updateSql))
            {
                statement.setString(1, name);
                statement.setString(2, surname);
                statement.setInt(3, id);

                statement.executeUpdate();
            }

            context.status(200).json(new ProfileUpdateResponseData());
        });
    }
}
