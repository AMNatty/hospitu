package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.util.List;

public class CheckupReportsTable extends AbstractTable
{
    protected CheckupReportsTable()
    {
        super("checkupreports", "cr_");
    }

    public List<String> getCreateCommands(Connection connection)
    {
        var sql = """
            CREATE TABLE $
            (
                cr_id        INT PRIMARY KEY AUTO_INCREMENT,
                cr_dr_id     INT                  NOT NULL COMMENT 'ID přiřazeného lékaře',
                cr_ptch_id   INT                  NOT NULL COMMENT 'ID nadřazeného záznamu',
                cr_performed TINYINT(1) DEFAULT 0 NOT NULL,
                cr_report    TEXT                 NULL,
                cr_price     DECIMAL(8, 2)        NULL,
                
                CONSTRAINT checkupreports_doctors_dr_us_id_fk
                    FOREIGN KEY (cr_dr_id) REFERENCES doctors (dr_us_id),
                        
                CONSTRAINT checkupreports_patientcheckups_ptch_id_fk
                    FOREIGN KEY (cr_ptch_id) REFERENCES patientcheckups (ptch_id)
                        ON DELETE CASCADE
            );
            """;

        return List.of(sql);
    }
}
