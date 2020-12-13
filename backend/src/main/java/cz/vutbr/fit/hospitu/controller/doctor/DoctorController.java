package cz.vutbr.fit.hospitu.controller.doctor;

import cz.vutbr.fit.hospitu.data.request.doctor.NewPatientRequestData;
import cz.vutbr.fit.hospitu.data.request.doctor.UnPatientRequestData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.DoctorListResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.DoctorResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.HumanReadableResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.NewPatientUpdateResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.PractitionersListResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.PractitionersResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.UnPatientsListResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.UnPatientsResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.doctor.UnPatientsUpdateResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;
import java.util.*;
import cz.vutbr.fit.hospitu.access.AuthorizationManager;
import cz.vutbr.fit.hospitu.access.EnumAPIRole;

import java.sql.Date;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;

public class DoctorController
{
    private static final int SALT_LENGTH = 16;

    public static void getDoctorInfo(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT d.dr_us_id,
                pc.ptch_id,
                u.us_name AS first_name,
                u.us_surname AS last_name, 
                uc.uci_phone,
                uc.uci_email,
                uc.uci_birthdate,
                uc.uci_birthid,
                d.dr_schedulefrom,
                d.dr_scheduleto,
                de.dp_name AS department_name, 
                de.dp_location AS department_location
            FROM doctors AS d
                LEFT JOIN patientcheckups AS pc ON pc.ptch_dr_id = d.dr_us_id
                JOIN users AS u ON u.us_id = d.dr_us_id
                LEFT JOIN usercontactinfo AS uc ON uc.uci_us_id = u.us_id
                LEFTJOIN departments AS de ON de.dp_id = d.dr_dp_id
            """;

            try (var statement = connection.prepareStatement(sql))
            {
                var result = statement.executeQuery();

                List<DoctorResponseData> doctorListData = new ArrayList<>();

                while(result.next())
                {
                    int doctorsID = result.getInt("dr_us_id");
                    int fileID = result.getInt("ptch_id");
                    doctorListData.add(new DoctorResponseData(
                        doctorsID,
                        fileID,
                        result.getString("first_name"),
                        result.getString("last_name"),
                        result.getString("uci_phone"),
                        result.getString("uci_email"),
                        result.getString("uci_birthdate"),
                        result.getString("uci_birthid"),
                        result.getString("dr_schedulefrom"),
                        result.getString("dr_scheduleto"),
                        result.getString("department_name"),
                        result.getString("department_location")
                    ));
                }

                context.status(200).json(new DoctorListResponseData(doctorListData));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void getDoctorFiles(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT d.dr_us_id, pc.ptch_id, u.us_name AS first_name, u.us_surname AS last_name
            FROM doctors AS d
            LEFT JOIN patientcheckups AS pc ON pc.ptch_dr_id = d.dr_us_id
            JOIN users AS u ON u.us_id = d.dr_us_id
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                var result = statement.executeQuery();

                List<DoctorResponseData> doctorListData = new ArrayList<>();
                while(result.next())
                {
                    int doctorsID = result.getInt("dr_us_id");
                    int fileID = result.getInt("ptch_id");
                    doctorListData.add(new DoctorResponseData(
                        doctorsID,
                        fileID,
                        result.getString("first_name"),
                        result.getString("last_name")
                    ));
                }

                context.status(200).json(new DoctorListResponseData(doctorListData));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void getPractitioners(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT p.pc_id, p.pc_name, p.pc_surname, p.pc_workplace, p.pc_phone
            FROM practitioners AS p 
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                var result = statement.executeQuery();

                List<PractitionersResponseData> practitionersListData = new ArrayList<>();
                while(result.next())
                {
                    int idPractitioners = result.getInt("pc_id");
                    practitionersListData.add(new PractitionersResponseData(
                        idPractitioners,
                        result.getString("pc_name"),
                        result.getString("pc_surname"),
                        result.getString("pc_workplace"),
                        result.getString("pc_phone")
                    ));
                }

                context.status(200).json(new PractitionersListResponseData(practitionersListData));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void movePatient(Context context)
    {
        var targetTicketID = context.pathParam("un_pid", int.class).getOrNull();

        if (targetTicketID == null)
        {
            context.status(400);
            return;
        }

        moveP(context, targetTicketID);
    }

    public static void moveP(Context context, int pid)
    {
        try (var connection = SQLConnection.create())
        {
            var unPatientRequestData = context.bodyAsClass(UnPatientRequestData.class);

            String sql = """
            INSERT INTO patients(pt_us_id)
            VALUES (?)
            """;

            try (var statement = connection.prepareStatement(sql))
            {
                statement.setInt(1, pid);

                statement.executeUpdate();

            }

            context.status(200).json(new UnPatientsUpdateResponseData());

        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void updatePatient(Context context)
    {
        var targetTicketID = context.pathParam("un_pid", int.class).getOrNull();

        if (targetTicketID == null)
        {
            context.status(400);
            return;
        }

        updateP(context, targetTicketID);
    }

    public static void updateP(Context context, int pid)
    {
        try (var connection = SQLConnection.create())
        {
            var unPatientRequestData = context.bodyAsClass(UnPatientRequestData.class);

            String sql = """
            UPDATE patients
            SET pt_pc_id = ?, pt_allergies = ?, pt_conditions = ?, pt_gender = ?
            WHERE pt_us_id = ?
            """;

            try (var statement = connection.prepareStatement(sql))
            {
                statement.setInt(1, unPatientRequestData.getIdPractitioner());
                statement.setString(2, unPatientRequestData.getAllergies());
                statement.setString(3, unPatientRequestData.getConditions());
                statement.setString(4, unPatientRequestData.getGender());
                statement.setInt(5, pid);

                statement.executeUpdate();

            }

            context.status(200).json(new UnPatientsUpdateResponseData());

        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void getPatients(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT us_id, us_login, us_name, us_surname, p.pt_allergies, p.pt_conditions, p.pt_gender, pc.pc_id, pc.pc_name, pc.pc_surname
            FROM users
            JOIN patients p ON users.us_id = p.pt_us_id
            LEFT JOIN practitioners pc ON pc.pc_id = p.pt_pc_id
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                var result = statement.executeQuery();

                List<UnPatientsResponseData> unPatientsListData = new ArrayList<>();
                while(result.next())
                {
                    int idPatient = result.getInt("us_id");
                    int idPractitioner = result.getInt("pc_id");
                    unPatientsListData.add(new UnPatientsResponseData(
                        idPatient,
                        result.getString("us_name"),
                        result.getString("us_surname"),
                        result.getString("pt_allergies"),
                        result.getString("pt_conditions"),
                        result.getString("pt_gender"),
                        idPractitioner,
                        result.getString("pc_name"),
                        result.getString("pc_surname")
                    ));
                }

                context.status(200).json(new UnPatientsListResponseData(unPatientsListData));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void getUnPatients(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT us_id, us_login, us_name, us_surname
            FROM users
            LEFT JOIN patients p ON users.us_id = p.pt_us_id
            WHERE us_perms = 1 AND p.pt_us_id IS NULL
            """;

            try (var statement = connection.prepareStatement(sql))
            {

                var result = statement.executeQuery();

                List<UnPatientsResponseData> unPatientsListData = new ArrayList<>();
                while(result.next())
                {
                    int idPatient = result.getInt("us_id");
                    unPatientsListData.add(new UnPatientsResponseData(
                        idPatient,
                        result.getString("us_login"),
                        result.getString("us_name"),
                        result.getString("us_surname")
                    ));
                }

                context.status(200).json(new UnPatientsListResponseData(unPatientsListData));
            }
        }
        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }

    public static void putPatient(Context context)
    {

        var newPatientRequestData = context.bodyAsClass(NewPatientRequestData.class);

        LocalDate parsedDate;

        try
        {
            parsedDate = LocalDate.parse(newPatientRequestData.getBirthDate());
        }
        catch (DateTimeParseException e)
        {
            context.status(403).json(new HumanReadableResponseData(403, "Invalid birthDate.", "Datum narození není platné"));
            return;
        }

        SQLConnection.createTransaction(context, connection -> {
            var findExistingSql = """
            SELECT us_login FROM users WHERE us_login=?
            """;

            try (var statement = connection.prepareStatement(findExistingSql))
            {
                statement.setString(1, newPatientRequestData.getUsername());

                var result = statement.executeQuery();

                if (result.next())
                {
                    context.status(403).json(new HumanReadableResponseData(403,
                        "A user with this username already exists.",
                        "Uživatel s tímto přihlašovacím jménem již existuje."
                    ));
                    return;
                }
            }

            var createUserSQL = """
            INSERT INTO users (us_login, us_salt, us_name, us_surname, us_password, us_perms) 
            VALUES (?, ?, ?, ?, SHA2(CONCAT(?, ?), 256), ?);
            """;

            int userId;

            try (var statement = connection.prepareStatement(createUserSQL, Statement.RETURN_GENERATED_KEYS))
            {
                statement.setString(1, newPatientRequestData.getUsername());
                var salt = AuthorizationManager.instance().randomBase64(SALT_LENGTH);
                statement.setString(2, salt);
                statement.setString(3, newPatientRequestData.getName());
                statement.setString(4, newPatientRequestData.getSurname());
                statement.setString(5, newPatientRequestData.getPassword());
                statement.setString(6, salt);
                var role = EnumAPIRole.PATIENT.getDBName();
                statement.setString(7, role);

                statement.executeUpdate();

                var generatedKeys = statement.getGeneratedKeys();

                if (!generatedKeys.next())
                {
                    context.status(500).json(new HumanReadableResponseData(500,
                        "An error has occurred while creating the account.",
                        "Vyskytla se chyba při vytváření účtu."));
                    return;
                }

                userId = generatedKeys.getInt(1);

            }

            var insertContactInfo = """
            INSERT INTO usercontactinfo(uci_us_id, uci_phone, uci_email, uci_birthdate, uci_birthid) 
            VALUES (?, ?, ?, ?, ?)
            """;

            var birthDate = Date.valueOf(parsedDate);

            try (var stat = connection.prepareStatement(insertContactInfo))
            {
                stat.setInt(1, userId);
                stat.setString(2, newPatientRequestData.getPhone());
                stat.setString(3, newPatientRequestData.getEmail());
                stat.setDate(4, birthDate);
                stat.setString(5, newPatientRequestData.getBirthId());

                stat.executeUpdate();
            }

            var insertPatientInfo = """
            INSERT INTO patients(pt_us_id, pt_pc_id, pt_allergies, pt_conditions, pt_gender)
            VALUES (?, ?, ?, ?, ?)
            """;

            try (var stat = connection.prepareStatement(insertPatientInfo))
            {
                stat.setInt(1, userId);
                stat.setInt(2, newPatientRequestData.getPractitionerId());
                stat.setString(3, newPatientRequestData.getAllergies());
                stat.setString(4, newPatientRequestData.getConditions());
                stat.setString(5, newPatientRequestData.getGender());
                stat.executeUpdate();
            }

            context.status(200).json(new NewPatientUpdateResponseData());

        });
    }
}
