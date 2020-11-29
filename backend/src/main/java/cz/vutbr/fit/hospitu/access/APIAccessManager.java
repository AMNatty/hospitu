package cz.vutbr.fit.hospitu.access;

import cz.vutbr.fit.hospitu.data.response.Generic401ResponseData;
import cz.vutbr.fit.hospitu.data.response.Generic403ResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import cz.vutbr.fit.hospitu.sql.table.Tables;
import io.javalin.core.security.Role;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.jetbrains.annotations.NotNull;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.OptionalInt;
import java.util.Set;

public class APIAccessManager
{
    private static final Map<Integer, EnumAPIRole> roleCache = new HashMap<>();

    public static synchronized boolean setRole(Connection connection, int user, EnumAPIRole role) throws SQLException
    {
        String sql = """
        UPDATE $ SET us_perms=? WHERE us_id=?
        """.replace("$", Tables.TABLE_USERS.getName());

        try (var statement = connection.prepareStatement(sql))
        {
            statement.setString(1, role.getDBName());
            statement.setInt(2, user);

            var result = statement.executeUpdate() == 1;

            if (result)
                roleCache.put(user, role);

            return result;
        }
    }

    public static synchronized EnumAPIRole getRole(int user) throws SQLException
    {
        if (roleCache.containsKey(user))
        {
            return roleCache.get(user);
        }

        try (var connection = SQLConnection.create())
        {
            String sql = """
                SELECT us_perms FROM $ WHERE us_id=?
                """.replace("$", Tables.TABLE_USERS.getName());

            try (var statement = connection.prepareStatement(sql))
            {
                statement.setInt(1, user);

                var result = statement.executeQuery();

                if (!result.next())
                {
                    return null;
                }

                var role = EnumAPIRole.getByDBName(result.getString("us_perms"));
                roleCache.put(user, role);
                return role;
            }
        }
    }

    public static synchronized Set<? extends Role> getAccessLevel(int user) throws SQLException
    {
        var role = getRole(user);
        return role == null ? null : role.getCumulativePermissions();
    }

    public static synchronized OptionalInt getUser(Context ctx)
    {
        String tokenRaw = ctx.header("Authorization");

        if (tokenRaw == null)
        {
            return OptionalInt.empty();
        }

        String token = tokenRaw.replaceFirst("^Bearer ", "").strip();

        return AuthorizationManager.instance().getUser(token);
    }

    public static void manage(@NotNull Handler handler, @NotNull Context ctx, @NotNull Set<Role> permittedRoles) throws Exception
    {
        if (permittedRoles.contains(EnumAPIRole.ANONYMOUS))
        {
            // Anonymous access
            handler.handle(ctx);
            return;
        }

        var userResult = getUser(ctx);

        if (userResult.isEmpty())
        {
            ctx.status(401).json(new Generic401ResponseData());
            return;
        }

        var user = userResult.getAsInt();

        var accessLevel = getAccessLevel(user);

        if (accessLevel == null)
        {
            ctx.status(403).json(new Generic403ResponseData("User not found."));
            return;
        }

        if (permittedRoles.stream().noneMatch(accessLevel::contains))
        {
            ctx.status(403).json(new Generic403ResponseData());
            return;
        }

        handler.handle(ctx);
    }
}
