package cz.vutbr.fit.hospitu.frontend.api.request;

import org.jetbrains.annotations.NotNull;

public class LoginRequestData
{
    @NotNull
    private final String username;

    @NotNull
    private final String password;

    public LoginRequestData(@NotNull String username, @NotNull String password)
    {
        this.username = username;
        this.password = password;
    }

    public @NotNull String getUsername()
    {
        return this.username;
    }

    public @NotNull String getPassword()
    {
        return this.password;
    }
}
