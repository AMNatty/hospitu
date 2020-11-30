package cz.vutbr.fit.hospitu.data.response.generic;

import org.jetbrains.annotations.NotNull;

public class Generic403ResponseData extends AbstractGenericCodeResponseData
{
    public Generic403ResponseData()
    {
        super(403, "Forbidden.");
    }

    public Generic403ResponseData(@NotNull String message)
    {
        super(403, message);
    }
}
