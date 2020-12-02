package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.access.AuthorizationManager;
import cz.vutbr.fit.hospitu.access.EnumAPIRole;
import cz.vutbr.fit.hospitu.controller.validator.UserValidator;
import cz.vutbr.fit.hospitu.data.request.RegistrationRequestData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.HumanReadableResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.RegistrationResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.Statement;

public class RegisterController
{
    private static final int SALT_LENGTH = 16;

    public static void putRegister(Context context)
    {
        var registrationRequestData = context.bodyAsClass(RegistrationRequestData.class);

        var login = UserValidator.validateUsername(context, registrationRequestData.getUsername());
        var name = UserValidator.validateName(context, registrationRequestData.getName());
        var surname = UserValidator.validateSurname(context, registrationRequestData.getSurname());
        var password = UserValidator.validatePassword(context, registrationRequestData.getPassword());

        SQLConnection.createTransaction(context, connection -> {
            var findExistingSql = """
            SELECT us_login FROM users WHERE us_login=?
            """;

            try (var statement = connection.prepareStatement(findExistingSql))
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

            var createSql = """
            INSERT INTO users (us_login, us_salt, us_name, us_surname, us_password, us_perms) 
            VALUES (?, ?, ?, ?, SHA2(CONCAT(?, ?), 256), ?);
            """;

            try (var statement = connection.prepareStatement(createSql, Statement.RETURN_GENERATED_KEYS))
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
