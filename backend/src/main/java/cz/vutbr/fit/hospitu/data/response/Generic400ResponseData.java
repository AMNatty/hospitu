package cz.vutbr.fit.hospitu.data.response;

import org.jetbrains.annotations.NotNull;

public class Generic400ResponseData extends AbstractGenericCodeResponseData
{
    public Generic400ResponseData()
    {
        super(400, "Bad request.");
    }

    public Generic400ResponseData(@NotNull String message)
    {
        super(400, message);
    }
}
