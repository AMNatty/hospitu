package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.util.List;

public class UserTable extends AbstractTable
{
    protected UserTable()
    {
        super("users", "us_");
    }

    public List<String> getCreateCommands(Connection connection)
    {
        var sql = """
            CREATE TABLE $
            (
                us_id       INT PRIMARY KEY AUTO_INCREMENT,
                us_login    VARCHAR(24)                                             UNIQUE NOT NULL,
                us_salt     CHAR(16)                                                NOT NULL,
                us_password CHAR(64)                                                NOT NULL,
                us_name     VARCHAR(40)                                             NOT NULL,
                us_surname  VARCHAR(40)                                             NOT NULL,
                us_perms    ENUM ('PATIENT', 'DOCTOR', 'INSURANCE_WORKER', 'ADMIN') NOT NULL DEFAULT 'PATIENT'
            )
            """;

        return List.of(sql);
    }
}
