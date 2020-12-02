package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.util.List;

public class InsuranceAgentsTable extends AbstractTable
{
    protected InsuranceAgentsTable()
    {
        super("insuranceagents", "ia_");
    }

    public List<String> getCreateCommands(Connection connection)
    {
        var sql = """
            CREATE TABLE $
            (
                ia_us_id                  INT PRIMARY KEY NOT NULL,
                ia_insurancecompanynumber INT NOT NULL,
                                    
                CONSTRAINT agents_users_us_id_fk
                    FOREIGN KEY (ia_us_id) REFERENCES users (us_id)
                        ON DELETE CASCADE
            );
            """;

        return List.of(sql);
    }
}
