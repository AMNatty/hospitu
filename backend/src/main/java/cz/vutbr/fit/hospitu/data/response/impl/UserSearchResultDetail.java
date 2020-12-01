package cz.vutbr.fit.hospitu.data.response.impl;

import cz.vutbr.fit.hospitu.access.EnumAPIRole;
import org.jetbrains.annotations.NotNull;

public class UserSearchResultDetail extends UserSearchResult
{
    private final String birthDate;

    public UserSearchResultDetail(int id, @NotNull String name, @NotNull String surname, @NotNull EnumAPIRole role, String birthDate)
    {
        super(id, name, surname, role);

        this.birthDate = birthDate;
    }

    public String getBirthDate()
    {
        return this.birthDate;
    }
}
