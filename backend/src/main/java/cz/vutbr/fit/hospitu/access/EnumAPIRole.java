package cz.vutbr.fit.hospitu.access;

import io.javalin.core.security.Role;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public enum EnumAPIRole implements Role
{
    ANONYMOUS(null, Set.of()),
    PATIENT("PATIENT", Set.of(ANONYMOUS)),
    DOCTOR("DOCTOR", Set.of(PATIENT)),
    INSURANCE_WORKER("INSURANCE_WORKER", Set.of(PATIENT)),
    ADMIN("ADMIN", Set.of(DOCTOR, INSURANCE_WORKER));

    private static final Map<String, EnumAPIRole> nameLookup = new HashMap<>();

    static
    {
        for (var value : values())
            if (value.dbName != null)
                nameLookup.put(value.dbName, value);
    }

    private final Set<EnumAPIRole> cumulativePermissions;
    private final String dbName;

    EnumAPIRole(String dbName, Set<EnumAPIRole> inheritsFrom)
    {
        this.dbName = dbName;
        this.cumulativePermissions = inheritsFrom
                .stream()
                .map(EnumAPIRole::getCumulativePermissions)
                .flatMap(Set::stream)
                .collect(Collectors.toSet());
        this.cumulativePermissions.add(this);
    }

    public String getDBName()
    {
        return this.dbName;
    }

    public Set<EnumAPIRole> getCumulativePermissions()
    {
        return Collections.unmodifiableSet(this.cumulativePermissions);
    }

    public static EnumAPIRole getByDBName(String dbName)
    {
        return nameLookup.get(dbName);
    }
}
