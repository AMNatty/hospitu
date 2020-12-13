package cz.vutbr.fit.hospitu.data.response.impl.patient;

import cz.vutbr.fit.hospitu.data.response.AbstractResponseData;

public class PatientInfoResponseData extends AbstractResponseData
{
    private final String practitioner;
    private final String allergies;
    private final String conditions;
    private final String gender;

    private PatientInfoResponseData()
    {
        super(404);

        this.practitioner = null;
        this.allergies = null;
        this.conditions = null;
        this.gender = null;
    }

    private PatientInfoResponseData(String practitioner, String allergies, String conditions, String gender)
    {
        super(200);

        this.practitioner = practitioner;
        this.allergies = allergies;
        this.conditions = conditions;
        this.gender = gender;
    }

    public static PatientInfoResponseData empty()
    {
        return new PatientInfoResponseData();
    }

    public static PatientInfoResponseData of(String practitionerName, String practitionerSurname, String practitionerWorkplace, String practitionerPhone,
                            String allergies, String condition, String gender)
    {
        String practitioner = null;

        if (practitionerName != null && practitionerSurname != null)
        {
            var pracBuilder = new StringBuilder();
            pracBuilder.append(practitionerName);
            pracBuilder.append(" ");
            pracBuilder.append(practitionerSurname);

            if (practitionerWorkplace != null)
            {
                pracBuilder.append(", ");
                pracBuilder.append(practitionerWorkplace);
            }

            if (practitionerPhone != null)
            {
                pracBuilder.append(", tel. ");
                pracBuilder.append(practitionerPhone);
            }

            practitioner = pracBuilder.toString();
        }

        return new PatientInfoResponseData(
            practitioner,
            allergies,
            condition,
            gender == null ? null : switch (gender) {
                case "MALE" -> "Muž";
                case "FEMALE" -> "Žena";
                default -> null;
            }
        );
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
