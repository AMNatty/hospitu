package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.util.List;

public class UserTable extends AbstractTable
{
    protected UserTable()
    {
        super("Users", "us_");
    }

    public List<String> getCreateCommands(Connection connection)
    {
        var sql = """
            CREATE TABLE $
            (
                us_id       INT PRIMARY KEY AUTO_INCREMENT,
                us_login    VARCHAR(24)                                             NOT NULL,
                us_salt     CHAR(16)                                                NOT NULL,
                us_password CHAR(64)                                                NOT NULL,
                us_name     VARCHAR(40)                                             NOT NULL,
                us_surname  VARCHAR(40)                                             NOT NULL,
                us_perms    ENUM ('PATIENT', 'DOCTOR', 'INSURANCE_WORKER', 'ADMIN') NOT NULL DEFAULT 'PATIENT'
            )
            """;

        var sql1 = """
            CREATE UNIQUE INDEX users_us_login_uindex ON $(us_login)
            """;

        return List.of(sql, sql1);
    }
}
