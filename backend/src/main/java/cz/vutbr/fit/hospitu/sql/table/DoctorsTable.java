package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.util.List;

public class DoctorsTable extends AbstractTable
{
    protected DoctorsTable()
    {
        super("doctors", "dr_");
    }

    public List<String> getCreateCommands(Connection connection)
    {
        var sql = """
            CREATE TABLE $
            (
                dr_us_id        INT PRIMARY KEY AUTO_INCREMENT,
                dr_dp_id        INT  NULL,
                dr_schedulefrom TIME NULL,
                dr_scheduleto   TIME NULL,
                
                CONSTRAINT doctors_departments_dp_id_fk
                    FOREIGN KEY (dr_dp_id) REFERENCES departments (dp_id)
                        ON DELETE SET NULL,
                        
                CONSTRAINT doctors_users_us_id_fk
                    FOREIGN KEY (dr_us_id) REFERENCES users (us_id)
                        ON DELETE CASCADE
            );
            """;

        return List.of(sql);
    }
}
