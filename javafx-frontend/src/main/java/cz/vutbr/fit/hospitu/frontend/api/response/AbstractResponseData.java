package cz.vutbr.fit.hospitu.frontend.api.response;

public abstract class AbstractResponseData
{
    protected final int code;

    public AbstractResponseData(int code)
    {
        this.code = code;
    }

    public int getCode()
    {
        return this.code;
    }
}