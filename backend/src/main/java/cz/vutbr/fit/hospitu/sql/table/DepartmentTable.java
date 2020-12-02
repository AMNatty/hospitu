package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.util.List;

public class DepartmentTable extends AbstractTable
{
    protected DepartmentTable()
    {
        super("departments", "dp_");
    }

    public List<String> getCreateCommands(Connection connection)
    {
        var sql = """
            CREATE TABLE $
            (
                dp_id       INT PRIMARY KEY AUTO_INCREMENT,
                dp_openfrom TIME        NULL,
                dp_opento   TIME        NULL,
                dp_name     VARCHAR(55) NOT NULL,
                dp_location VARCHAR(70) NULL
            )
            """;

        return List.of(sql);
    }
}
