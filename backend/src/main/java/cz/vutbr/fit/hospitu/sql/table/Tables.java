package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class Tables
{
    public static UserTable TABLE_USERS = new UserTable();

    public static void initialize(Connection connection) throws SQLException
    {
        for (var table: List.of(TABLE_USERS))
        {
            if (!table.exists(connection))
                table.create(connection);
            else
                System.out.printf("Table '%s' already exists, will not be created%n", table.getName());
        }
    }
}
