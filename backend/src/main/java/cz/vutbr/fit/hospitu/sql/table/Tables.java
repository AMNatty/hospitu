package cz.vutbr.fit.hospitu.sql.table;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class Tables
{
    public static final UserTable TABLE_USERS = new UserTable();
    public static final CheckupReportsTable TABLE_CHECKUP_REPORTS = new CheckupReportsTable();
    public static final DepartmentTable TABLE_DEPARTMENTS = new DepartmentTable();
    public static final DoctorsTable TABLE_DOCTORS = new DoctorsTable();
    public static final InsuranceAgentsTable TABLE_INSURANCE_AGENTS = new InsuranceAgentsTable();
    public static final InsuranceRequestsTable TABLE_INSURANCE_REQUESTS = new InsuranceRequestsTable();
    public static final PatientCheckupsTable TABLE_PATIENT_CHECKUPS = new PatientCheckupsTable();
    public static final PatientsTable TABLE_PATIENTS = new PatientsTable();
    public static final PractitionersTable TABLE_PRACTITIONERS = new PractitionersTable();
    public static final UserContactInfoTable TABLE_USER_CONTACT_INFO = new UserContactInfoTable();

    public static void initialize(Connection connection) throws SQLException
    {
        final var tables = List.of(
            TABLE_DEPARTMENTS,
            TABLE_PRACTITIONERS,
            TABLE_USERS,
            TABLE_DOCTORS,
            TABLE_INSURANCE_AGENTS,
            TABLE_PATIENTS,
            TABLE_PATIENT_CHECKUPS,
            TABLE_CHECKUP_REPORTS,
            TABLE_INSURANCE_REQUESTS,
            TABLE_USER_CONTACT_INFO
        );

        for (var table: tables)
        {
            if (!table.exists(connection))
                table.create(connection);
            else
                System.out.printf("Table '%s' already exists, will not be created%n", table.getName());
        }
    }
}
