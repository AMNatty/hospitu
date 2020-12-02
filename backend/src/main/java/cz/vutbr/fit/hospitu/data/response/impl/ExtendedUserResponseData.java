package cz.vutbr.fit.hospitu.data.response.impl;

import org.jetbrains.annotations.NotNull;

public class ExtendedUserResponseData extends UserResponseData
{
    private final String birthDate;
    private final String birthID;
    private final String email;
    private final String phone;

    public ExtendedUserResponseData(int id,
                                    @NotNull String login,
                                    @NotNull String name,
                                    @NotNull String surname,
                                    @NotNull String role,
                                    String birthDate,
                                    String birthID,
                                    String email,
                                    String phone)
    {
        super(id, login, name, surname, role);

        this.birthDate = birthDate;
        this.birthID = birthID;
        this.email = email;
        this.phone = phone;
    }

    public String getBirthDate()
    {
        return this.birthDate;
    }

    public String getBirthID()
    {
        return this.birthID;
    }

    public String getEmail()
    {
        return this.email;
    }

    public String getPhone()
    {
        return this.phone;
    }
}
