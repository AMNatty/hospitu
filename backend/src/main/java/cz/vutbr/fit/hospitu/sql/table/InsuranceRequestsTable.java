package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.util.List;

public class InsuranceRequestsTable extends AbstractTable
{
    protected InsuranceRequestsTable()
    {
        super("insurancerequests", "ir_id");
    }

    public List<String> getCreateCommands(Connection connection)
    {
        var sql = """
            CREATE TABLE $
            (
                ir_id       INT PRIMARY KEY AUTO_INCREMENT,
                ir_cr_id    INT        NOT NULL COMMENT 'ID reportu',
                ir_approved TINYINT(1) NULL,
                                    
                CONSTRAINT insurancerequests_checkupreports_cr_id_fk
                    FOREIGN KEY (ir_cr_id) REFERENCES checkupreports (cr_id)
                        ON DELETE CASCADE
            );
            """;

        return List.of(sql);
    }
}
