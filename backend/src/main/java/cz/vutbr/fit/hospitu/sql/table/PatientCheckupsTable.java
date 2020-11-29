package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.util.List;

public class PatientCheckupsTable extends AbstractTable
{
    protected PatientCheckupsTable()
    {
        super("patientcheckups", "ptch_");
    }

    public List<String> getCreateCommands(Connection connection)
    {
        var sql = """
            CREATE TABLE $
            (
                 ptch_id          INT  PRIMARY KEY NOT NULL,
                 ptch_us_id       INT  NOT NULL,
                 ptch_dr_id       INT  NULL COMMENT 'ID lékaře spravujícího tento záznam',
                 ptch_description TEXT NOT NULL,
                 ptch_name        VARCHAR(120) NOT NULL,
                 ptch_from        DATETIME NOT NULL,
                 ptch_to          DATETIME NOT NULL,
                 ptch_finished    BOOLEAN DEFAULT FALSE NOT NULL,
                                      
                 CONSTRAINT patientcheckups_doctors_dr_us_id_fk
                     FOREIGN KEY (ptch_dr_id) REFERENCES doctors (dr_us_id),
                     
                 CONSTRAINT patientcheckups_patients_pt_us_id_fk
                     FOREIGN KEY (ptch_us_id) REFERENCES patients (pt_us_id)
                         ON DELETE CASCADE
             );
            """;

        return List.of(sql);
    }
}
