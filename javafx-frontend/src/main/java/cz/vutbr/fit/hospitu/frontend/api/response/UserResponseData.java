package cz.vutbr.fit.hospitu.frontend.api.response;

import cz.vutbr.fit.hospitu.frontend.api.EnumAPIRole;
import org.jetbrains.annotations.NotNull;

public class UserResponseData extends AbstractResponseData
{
    private final int id;

    @NotNull
    private final String login;

    @NotNull
    private final String name;

    @NotNull
    private final String surname;

    @NotNull
    private final EnumAPIRole role;

    public UserResponseData(int id, @NotNull String login, @NotNull String name, @NotNull String surname, @NotNull EnumAPIRole role)
    {
        this(200, id, login, name, surname, role);
    }

    public UserResponseData(int responseCode, int id, @NotNull String login, @NotNull String name, @NotNull String surname, @NotNull EnumAPIRole role)
    {
        super(responseCode);

        this.id = id;
        this.login = login;
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

    public @NotNull String getLogin()
    {
        return this.login;
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
