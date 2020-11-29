package cz.vutbr.fit.hospitu.data.response;

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
    private final String role;

    public UserResponseData(int id, @NotNull String login, @NotNull String name, @NotNull String surname, @NotNull String role)
    {
        this(200, id, login, name, surname, role);
    }

    public UserResponseData(int responseCode, int id, @NotNull String login, @NotNull String name, @NotNull String surname, @NotNull String role)
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

    public @NotNull String getRole()
    {
        return this.role;
    }
}
