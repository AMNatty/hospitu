package cz.vutbr.fit.hospitu.frontend.api.response;

import cz.vutbr.fit.hospitu.frontend.api.EnumAPIRole;
import org.jetbrains.annotations.NotNull;

public class LoginResponseData extends UserResponseData
{
    @NotNull
    private final String token;

    public LoginResponseData(int id, @NotNull String login, @NotNull String name, @NotNull String surname, @NotNull EnumAPIRole role, @NotNull String authToken)
    {
        super(200, id, login, name, surname, role);

        this.token = authToken;
    }

    public @NotNull String getToken()
    {
        return this.token;
    }
}
