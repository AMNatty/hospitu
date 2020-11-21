package cz.vutbr.fit.hospitu.data.response;

public abstract class AbstractGenericCodeResponseData extends AbstractResponseData
{
    protected final String message;

    public AbstractGenericCodeResponseData(int code, String message)
    {
        super(code);
        this.message = message;
    }

    public String getMessage()
    {
        return this.message;
    }
}
