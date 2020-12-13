package cz.vutbr.fit.hospitu.frontend.api.response;

public class PatientInfoResponseData extends AbstractResponseData
{
    private final String practitioner;
    private final String allergies;
    private final String conditions;
    private final String gender;

    public PatientInfoResponseData()
    {
        super(404);

        this.practitioner = null;
        this.allergies = null;
        this.conditions = null;
        this.gender = null;
    }

    public PatientInfoResponseData(String practitioner, String allergies, String conditions, String gender)
    {
        super(200);

        this.practitioner = practitioner;
        this.allergies = allergies;
        this.conditions = conditions;
        this.gender = gender;
    }

    public String getAllergies()
    {
        return this.allergies;
    }

    public String getConditions()
    {
        return this.conditions;
    }

    public String getGender()
    {
        return this.gender;
    }

    public String getPractitioner()
    {
        return this.practitioner;
    }
}
