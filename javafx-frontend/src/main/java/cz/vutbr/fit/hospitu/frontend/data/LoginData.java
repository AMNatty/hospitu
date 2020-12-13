package cz.vutbr.fit.hospitu.frontend.data;

import cz.vutbr.fit.hospitu.frontend.api.EnumAPIRole;
import org.jetbrains.annotations.NotNull;

public class LoginData
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

    @NotNull
    private final String token;

    public LoginData(int id, @NotNull String login, @NotNull String name, @NotNull String surname, @NotNull EnumAPIRole role, @NotNull String token)
    {
        this.id = id;
        this.login = login;
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.token = token;
    }

    public int getID()
    {
        return this.id;
    }

    @NotNull
    public String getLogin()
    {
        return this.login;
    }

    @NotNull
    public String getName()
    {
        return this.name;
    }

    @NotNull
    public String getSurname()
    {
        return this.surname;
    }

    @NotNull
    public EnumAPIRole getRole()
    {
        return this.role;
    }

    @NotNull
    public String getToken()
    {
        return this.token;
    }
}
