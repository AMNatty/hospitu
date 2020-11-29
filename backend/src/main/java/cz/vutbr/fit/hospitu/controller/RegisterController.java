package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.access.AuthorizationManager;
import cz.vutbr.fit.hospitu.access.EnumAPIRole;
import cz.vutbr.fit.hospitu.data.request.RegistrationRequestData;
import cz.vutbr.fit.hospitu.data.response.HumanReadableResponseData;
import cz.vutbr.fit.hospitu.data.response.RegistrationResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import cz.vutbr.fit.hospitu.sql.table.Tables;
import io.javalin.http.Context;

import java.sql.Statement;

public class RegisterController
{
    private static final int USERNAME_MIN_LENGTH = 3;
    private static final int USERNAME_MAX_LENGTH = 24;

    private static final int PASSWORD_MIN_LENGTH = 6;
    private static final int PASSWORD_MAX_LENGTH = 64;

    private static final int NAME_MIN_LENGTH = 1;
    private static final int NAME_MAX_LENGTH = 40;

    private static final int SURNAME_MIN_LENGTH = 1;
    private static final int SURNAME_MAX_LENGTH = 40;

    private static final int SALT_LENGTH = 16;

    private static final String USERNAME_REGEX = "[a-zA-Z0-9]+[a-zA-Z0-9-.]+[a-zA-Z0-9]+";
    private static final String NAME_REGEX = "[^@#<>\\\\/]+";

    public static void putRegister(Context context)
    {
        var registrationRequestData = context.bodyAsClass(RegistrationRequestData.class);

        var loginRaw = registrationRequestData.getUsername();
        var nameRaw = registrationRequestData.getName();
        var surnameRaw = registrationRequestData.getSurname();
        var password = registrationRequestData.getPassword();

        if (loginRaw == null || nameRaw == null || surnameRaw == null || password == null)
        {
            context.status(400);
            return;
        }

        var login = loginRaw.strip();
        var name = nameRaw.strip();
        var surname = surnameRaw.strip();

        if (!login.matches(USERNAME_REGEX))
        {
            context.status(403).json(new HumanReadableResponseData(403,
                "Illegal characters in username.",
                "Vaše uživatelské jméno obsahuje neplatné znaky."
            ));

            return;
        }

        if (!nameRaw.matches(NAME_REGEX))
        {
            context.status(403).json(new HumanReadableResponseData(403,
                "Illegal characters in name.",
                "Vaše jméno obsahuje neplatné znaky, zkuste je odebrat."
            ));

            return;
        }

        if (!surnameRaw.matches(NAME_REGEX))
        {
            context.status(403).json(new HumanReadableResponseData(403,
                "Illegal characters in surname.",
                "Vaše příjmení obsahuje neplatné znaky, zkuste je odebrat."
            ));

            return;
        }

        SQLConnection.createTransaction(context, connection -> {
            String sql = """
            SELECT us_login FROM $ WHERE us_login=?
            """.replace("$", Tables.TABLE_USERS.getName());

            try (var statement = connection.prepareStatement(sql))
            {
                statement.setString(1, registrationRequestData.getUsername());

                var result = statement.executeQuery();

                if (result.next())
                {
                    context.status(403).json(new HumanReadableResponseData(403,
                        "A user with this username already exists.",
                        "Uživatel s tímto přihlašovacím jménem již existuje."
                    ));
                    return;
                }
            }

            if (login.length() < USERNAME_MIN_LENGTH || login.length() > USERNAME_MAX_LENGTH)
            {
                context.status(403).json(new HumanReadableResponseData(400,
                    "Username length out of range.",
                    String.format("Uživateské jméno musí mít délku v rozsahu %d až %d znaků.", USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
                ));
                return;
            }

            if (password.length() < PASSWORD_MIN_LENGTH || password.length() > PASSWORD_MAX_LENGTH)
            {
                context.status(403).json(new HumanReadableResponseData(400,
                    "Password length out of range.",
                    String.format("Heslo musí mít délku v rozsahu %d až %d znaků.", PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
                ));
                return;
            }

            if (name.length() < NAME_MIN_LENGTH || name.length() > NAME_MAX_LENGTH)
            {
                context.status(403).json(new HumanReadableResponseData(400,
                    "Name length out of range.",
                    String.format("Jméno musí mít délku v rozsahu %d až %d znaků.", NAME_MIN_LENGTH, NAME_MAX_LENGTH)
                ));
                return;
            }

            if (surname.length() < SURNAME_MIN_LENGTH || surname.length() > SURNAME_MAX_LENGTH)
            {
                context.status(403).json(new HumanReadableResponseData(400,
                    "Password length out of range.",
                    String.format("Heslo musí mít délku v rozsahu %d až %d znaků.", SURNAME_MIN_LENGTH, SURNAME_MAX_LENGTH)
                ));
                return;
            }

            String registerSql = """
            INSERT INTO $ (us_login, us_salt, us_name, us_surname, us_password, us_perms) 
            VALUES (?, ?, ?, ?, SHA2(CONCAT(?, ?), 256), ?);
            """.replace("$", Tables.TABLE_USERS.getName());

            try (var statement = connection.prepareStatement(registerSql, Statement.RETURN_GENERATED_KEYS))
            {
                statement.setString(1, login);
                var salt = AuthorizationManager.instance().randomBase64(SALT_LENGTH);
                statement.setString(2, salt);
                statement.setString(3, name);
                statement.setString(4, surname);
                statement.setString(5, password);
                statement.setString(6, salt);
                var role = EnumAPIRole.PATIENT.getDBName();
                statement.setString(7, role);

                statement.executeUpdate();

                var generatedKeys = statement.getGeneratedKeys();

                if (!generatedKeys.next())
                {
                    context.status(500).json(new HumanReadableResponseData(500,
                        "An error has occurred while creating the account.",
                        "Vyskytla se chyba při vytváření účtu."));
                    return;
                }

                context.status(201).json(new RegistrationResponseData(
                    generatedKeys.getInt(1),
                    login,
                    name,
                    surname,
                    role
                ));
            }
        });
    }
}
