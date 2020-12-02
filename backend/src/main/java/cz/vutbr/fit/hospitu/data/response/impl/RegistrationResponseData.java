package cz.vutbr.fit.hospitu.data.response.impl;

import org.jetbrains.annotations.NotNull;

public class RegistrationResponseData extends UserResponseData
{
    public RegistrationResponseData(int id, @NotNull String login, @NotNull String name, @NotNull String surname, @NotNull String role)
    {
        super(201, id, login, name, surname, role);
    }
}
