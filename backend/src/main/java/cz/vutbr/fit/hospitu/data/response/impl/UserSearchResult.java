package cz.vutbr.fit.hospitu.data.response.impl;

import cz.vutbr.fit.hospitu.access.EnumAPIRole;
import org.jetbrains.annotations.NotNull;

public class UserSearchResult
{
    private final int id;

    @NotNull
    private final String name;

    @NotNull
    private final String surname;

    @NotNull
    private final EnumAPIRole role;

    public UserSearchResult(int id, @NotNull String name, @NotNull String surname, @NotNull EnumAPIRole role)
    {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.role = role;
    }

    public int getID()
    {
        return this.id;
    }

    public @NotNull String getName()
    {
        return this.name;
    }

    public @NotNull String getSurname()
    {
        return this.surname;
    }

    public @NotNull EnumAPIRole getRole()
    {
        return this.role;
    }
}
