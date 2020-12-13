package cz.vutbr.fit.hospitu.frontend.api;

import cz.vutbr.fit.hospitu.frontend.api.response.HumanReadableResponseData;

public class APIErrorException extends RuntimeException
{
    public APIErrorException()
    {
        super("Došlo k chybě při komunikaci se serverem, prosím zkuste to znovu později.");
    }

    public APIErrorException(HumanReadableResponseData responseData)
    {
        super(responseData.getHumanReadableMessage() == null ?
            "Došlo k chybě při komunikaci se serverem, prosím zkuste to znovu později."
            :
            responseData.getHumanReadableMessage());
    }
}
