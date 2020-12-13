package cz.vutbr.fit.hospitu.frontend.api;

import com.google.gson.annotations.JsonAdapter;

import java.lang.reflect.GenericArrayType;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@JsonAdapter(APIRoleAdapter.class)
public enum EnumAPIRole
{
    PATIENT("PATIENT", "Pacient"),
    DOCTOR("DOCTOR", "Lékař"),
    INSURANCE_WORKER("INSURANCE_WORKER", "Pracovník pojišťovny"),
    ADMIN("ADMIN", "Administrátor");

    private static final Map<String, EnumAPIRole> nameLookup = new HashMap<>();

    static
    {
        for (var value : values())
            if (value.dbName != null)
                nameLookup.put(value.dbName, value);
    }

    private final String readableName;
    private final String dbName;

    EnumAPIRole(String dbName, String readableName)
    {
        this.dbName = dbName;
        this.readableName = readableName;
    }

    public String getDBName()
    {
        return this.dbName;
    }

    public static EnumAPIRole getByDBName(String dbName)
    {
        return nameLookup.get(dbName);
    }

    public String getReadableName()
    {
        return this.readableName;
    }

    @Override
    public String toString()
    {
        return this.readableName;
    }
}
