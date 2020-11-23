package cz.vutbr.fit.hospitu.data.response;

public class UserResponseData extends AbstractResponseData
{
    private final int id;
    private final String login;
    private final String name;
    private final String surname;
    private final String role;

    public UserResponseData(int id, String login, String name, String surname, String role)
    {
        super(200);

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

    public String getName()
    {
        return this.name;
    }

    public String getLogin()
    {
        return this.login;
    }

    public String getSurname()
    {
        return this.surname;
    }

    public String getRole()
    {
        return this.role;
    }
}
