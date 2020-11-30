package cz.vutbr.fit.hospitu.data.response.generic;

public class Generic500ResponseData extends AbstractGenericCodeResponseData
{
    public Generic500ResponseData()
    {
        super(500, "Internal server error.");
    }
}
