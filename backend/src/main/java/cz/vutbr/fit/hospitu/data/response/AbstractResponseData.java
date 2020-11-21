package cz.vutbr.fit.hospitu.data.response;

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