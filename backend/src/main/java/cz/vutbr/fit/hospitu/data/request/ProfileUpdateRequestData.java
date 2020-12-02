package cz.vutbr.fit.hospitu.data.request;

public class ProfileUpdateRequestData
{
    private String name;

    private String surname;

    private String birthDate;

    private String birthID;

    private String email;

    private String phone;

    public String getName()
    {
        return this.name;
    }

    public String getSurname()
    {
        return this.surname;
    }

    public String getEmail()
    {
        return this.email;
    }

    public String getBirthID()
    {
        return this.birthID;
    }

    public String getBirthDate()
    {
        return this.birthDate;
    }

    public String getPhone()
    {
        return this.phone;
    }
}
