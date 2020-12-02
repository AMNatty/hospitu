package cz.vutbr.fit.hospitu.data.response.impl;

import cz.vutbr.fit.hospitu.data.response.generic.AbstractGenericCodeResponseData;

public class ProfileUpdateResponseData extends AbstractGenericCodeResponseData
{
    public ProfileUpdateResponseData()
    {
        super(200, "Profile updated.");
    }
}
