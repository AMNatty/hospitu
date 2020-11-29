package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public abstract class AbstractTable
{
    private final String name;
    private final String prefix;

    protected AbstractTable(String name, String prefix)
    {
        this.name = name;
        this.prefix = prefix;
    }

    public final String getName()
    {
        return this.name;
    }

    public final String getPrefix()
    {
        return this.prefix;
    }

    public boolean exists(Connection connection) throws SQLException
    {
        var sql = """
            SHOW TABLES LIKE ?
            """;

        try (var statement = connection.prepareStatement(sql))
        {
            statement.setString(1, this.getName());

            var resultSet = statement.executeQuery();
            return resultSet.next();
        }
    }

    public final void create(Connection connection) throws SQLException
    {
        System.out.printf("Creating table '%s'.%n", this.getName());

        for (var sqlCommand : getCreateCommands(connection))
        {
            var sql = sqlCommand.replace("$", this.getName());

            try (var statement = connection.prepareStatement(sql))
            {
                statement.executeUpdate();
            }
        }
    }

    public abstract List<String> getCreateCommands(Connection connection);
}
