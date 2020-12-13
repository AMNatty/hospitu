package cz.vutbr.fit.hospitu.frontend.api.response;

import org.jetbrains.annotations.NotNull;

public class HumanReadableResponseData extends AbstractGenericCodeResponseData
{
    private final String humanReadableMessage;

    public HumanReadableResponseData(int code, @NotNull String message, String humanReadableMessage)
    {
        super(code, message);

        this.humanReadableMessage = humanReadableMessage;
    }

    public String getHumanReadableMessage()
    {
        return this.humanReadableMessage;
    }
}
