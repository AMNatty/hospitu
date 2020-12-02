package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.util.List;

public class PatientsTable extends AbstractTable
{
    protected PatientsTable()
    {
        super("patients", "pt_");
    }

    public List<String> getCreateCommands(Connection connection)
    {
        var sql = """
            CREATE TABLE $
            (
                pt_us_id      INT                              PRIMARY KEY NOT NULL,
                pt_pc_id      INT                              NULL COMMENT 'Praktický lékař pacienta',
                pt_allergies  VARCHAR(250) DEFAULT ''          NOT NULL COMMENT 'Seznam alergií pacienta',
                pt_conditions VARCHAR(250) DEFAULT ''          NOT NULL COMMENT 'Dlouhodobý zdravotní stav a potíže',
                pt_gender     ENUM ('MALE', 'FEMALE', 'OTHER') NULL COMMENT 'Pohlaví',
                
                CONSTRAINT patients_practitioners_pc_id_fk
                    FOREIGN KEY (pt_pc_id) REFERENCES practitioners (pc_id),
                    
                CONSTRAINT patients_users_us_id_fk
                    FOREIGN KEY (pt_us_id) REFERENCES users (us_id)
                        ON DELETE CASCADE
            );
            """;

        return List.of(sql);
    }
}
