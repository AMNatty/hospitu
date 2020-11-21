package cz.vutbr.fit.hospitu.data.response;

public class Generic404ResponseData extends AbstractGenericCodeResponseData
{
    public Generic404ResponseData(String message)
    {
        super(404, message);
    }
}
