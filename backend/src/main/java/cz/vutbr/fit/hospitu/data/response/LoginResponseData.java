package cz.vutbr.fit.hospitu.data.response;

public class LoginResponseData extends UserResponseData
{
    private final String token;

    public LoginResponseData(int id, String login, String name, String surname, String role, String authToken)
    {
        super(id, login, name, surname, role);

        this.token = authToken;
    }

    public String getToken()
    {
        return this.token;
    }
}
