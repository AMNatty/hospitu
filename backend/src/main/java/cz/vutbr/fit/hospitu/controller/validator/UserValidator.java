package cz.vutbr.fit.hospitu.controller.validator;

import io.javalin.http.Context;

import java.util.regex.Pattern;

public class UserValidator
{
    private static final int USERNAME_MIN_LENGTH = 3;
    private static final int USERNAME_MAX_LENGTH = 24;

    private static final String USERNAME_REGEX = "[a-zA-Z0-9]+[a-zA-Z0-9-.]+[a-zA-Z0-9]+";

    public static String validateUsername(Context context, String login)
    {
        return BasicValidator.validateRegex(context, "username", login, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, "uživatelské jméno", Pattern.compile(USERNAME_REGEX));
    }

    private static final int NAME_MIN_LENGTH = 1;
    private static final int NAME_MAX_LENGTH = 40;

    private static final String NAME_REGEX = "[^@#<>\\\\/]+";

    public static String validateName(Context context, String name)
    {
        return BasicValidator.validateRegex(context, "name", name, NAME_MIN_LENGTH, NAME_MAX_LENGTH, "příjmení", Pattern.compile(NAME_REGEX));
    }

    private static final int SURNAME_MIN_LENGTH = 1;
    private static final int SURNAME_MAX_LENGTH = 40;

    public static String validateSurname(Context context, String surname)
    {
        return BasicValidator.validateRegex(context, "surname", surname, SURNAME_MIN_LENGTH, SURNAME_MAX_LENGTH, "příjmení", Pattern.compile(NAME_REGEX));
    }

    private static final int PASSWORD_MIN_LENGTH = 6;
    private static final int PASSWORD_MAX_LENGTH = 64;

    public static String validatePassword(Context context, String password)
    {
        return BasicValidator.validateText(context, "password", password, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, "heslo");
    }
}
