package cz.vutbr.fit.hospitu.data.request;

import cz.vutbr.fit.hospitu.access.EnumAPIRole;

public class RoleChangeRequestData
{
    private int user;
    private EnumAPIRole newRole;

    public int getUser()
    {
        return this.user;
    }

    public EnumAPIRole getNewRole()
    {
        return this.newRole;
    }
}
