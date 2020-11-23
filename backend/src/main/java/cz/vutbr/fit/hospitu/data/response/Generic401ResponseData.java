package cz.vutbr.fit.hospitu.data.response;

public class Generic401ResponseData extends AbstractGenericCodeResponseData
{
    public Generic401ResponseData()
    {
        super(401, "Invalid or missing authorization token.");
    }
}
