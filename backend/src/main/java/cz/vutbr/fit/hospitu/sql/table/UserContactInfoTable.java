package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.util.List;

public class UserContactInfoTable extends AbstractTable
{
    protected UserContactInfoTable()
    {
        super("usercontactinfo", "uci_");
    }

    public List<String> getCreateCommands(Connection connection)
    {
        var sql = """
            CREATE TABLE $
            (
                uci_us_id     INT         NOT NULL,
                uci_phone     VARCHAR(20) UNIQUE NOT NULL,
                uci_email     VARCHAR(50) UNIQUE NOT NULL,
                uci_birthdate DATE        NOT NULL,
                uci_birthid   VARCHAR(15) UNIQUE NOT NULL,
                                    
                CONSTRAINT usercontactinfo_users_us_id_fk
                    FOREIGN KEY (uci_us_id) REFERENCES users (us_id)
                        ON DELETE CASCADE
            );
            """;

        return List.of(sql);
    }
}
