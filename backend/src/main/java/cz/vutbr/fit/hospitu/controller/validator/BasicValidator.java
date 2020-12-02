package cz.vutbr.fit.hospitu.controller.validator;

import cz.vutbr.fit.hospitu.data.response.impl.doctor.HumanReadableResponseData;
import io.javalin.http.Context;
import org.apache.commons.lang3.StringUtils;

import java.util.regex.Pattern;

public class BasicValidator
{
    public static String validateText(Context context, String fieldName, String value, int minLength, int maxLength, String readableName)
    {
        if (value == null)
        {
            context.status(400);
            throw new ValidationException();
        }

        value = value.strip();

        if (value.length() < minLength || value.length() > maxLength)
        {
            context.status(403).json(new HumanReadableResponseData(403,
                String.format("%s length out of range.", fieldName),
                String.format("%s musí mít délku v rozsahu %d až %d znaků.", StringUtils.capitalize(readableName), minLength, maxLength)
            ));
            throw new ValidationException();
        }

        return value;
    }

    public static String validateText(Context context, String fieldName, String value, int maxLength, String readableName)
    {
        return validateText(context, fieldName, value, 0, maxLength, readableName);
    }

    public static String validateRegex(Context context, String fieldName, String value, int minLength, int maxLength, String readableName, Pattern pattern)
    {
        value = validateText(context, fieldName, value, minLength, maxLength, readableName);
        value = value.strip();

        if (!pattern.matcher(value).matches())
        {
            context.status(403).json(new HumanReadableResponseData(403,
                String.format("Illegal characters in '%s'.", fieldName),
                String.format("%s obsahuje neplatné znaky, zkuste je odebrat.", StringUtils.capitalize(readableName))
            ));

            throw new ValidationException();
        }

        return value;
    }
}
