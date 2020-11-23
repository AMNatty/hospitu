package cz.vutbr.fit.hospitu.data.response;

public class Generic400ResponseData extends AbstractGenericCodeResponseData
{
    public Generic400ResponseData()
    {
        super(400, "Bad request.");
    }

    public Generic400ResponseData(String message)
    {
        super(400, message);
    }
}
