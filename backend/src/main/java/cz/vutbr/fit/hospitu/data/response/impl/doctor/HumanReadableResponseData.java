package cz.vutbr.fit.hospitu.data.response.impl.doctor;

import cz.vutbr.fit.hospitu.data.response.generic.AbstractGenericCodeResponseData;
import org.jetbrains.annotations.NotNull;

public class HumanReadableResponseData extends AbstractGenericCodeResponseData
{
    @NotNull
    private final String humanReadableMessage;

    public HumanReadableResponseData(int code, @NotNull String message, @NotNull String humanReadableMessage)
    {
        super(code, message);

        this.humanReadableMessage = humanReadableMessage;
    }

    public @NotNull String getHumanReadableMessage()
    {
        return this.humanReadableMessage;
    }
}
