package cz.vutbr.fit.hospitu.data.response;

import org.jetbrains.annotations.NotNull;

public abstract class AbstractGenericCodeResponseData extends AbstractResponseData
{
    @NotNull
    protected final String message;

    public AbstractGenericCodeResponseData(int code, @NotNull String message)
    {
        super(code);
        this.message = message;
    }

    public @NotNull String getMessage()
    {
        return this.message;
    }
}
