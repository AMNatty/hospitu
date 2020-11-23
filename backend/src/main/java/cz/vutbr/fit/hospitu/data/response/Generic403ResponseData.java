package cz.vutbr.fit.hospitu.data.response;

public class Generic403ResponseData extends AbstractGenericCodeResponseData
{
    public Generic403ResponseData()
    {
        super(403, "Forbidden.");
    }

    public Generic403ResponseData(String message)
    {
        super(403, message);
    }
}
