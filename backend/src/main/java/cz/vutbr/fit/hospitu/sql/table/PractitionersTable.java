package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.util.List;

public class PractitionersTable extends AbstractTable
{
    protected PractitionersTable()
    {
        super("practitioners", "pc_");
    }

    public List<String> getCreateCommands(Connection connection)
    {
        var sql = """
            CREATE TABLE $
            (
                pc_id        INT PRIMARY KEY AUTO_INCREMENT,
                pc_name      VARCHAR(40) NOT NULL,
                pc_surname   VARCHAR(40) NOT NULL,
                pc_workplace VARCHAR(80) NULL,
                pc_phone     VARCHAR(15) NULL
            );
            """;

        return List.of(sql);
    }
}
