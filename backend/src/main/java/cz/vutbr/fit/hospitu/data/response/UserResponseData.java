package cz.vutbr.fit.hospitu.data.response;

public class UserResponseData
{
    private final int id;
    private final String login;
    private final String name;
    private final String surname;

    public UserResponseData(int id, String login, String name, String surname)
    {
        this.id = id;
        this.login = login;
        this.name = name;
        this.surname = surname;
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
}
