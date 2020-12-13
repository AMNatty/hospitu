package cz.vutbr.fit.hospitu;

import cz.vutbr.fit.hospitu.access.APIAccessManager;
import cz.vutbr.fit.hospitu.access.EnumAPIRole;
import cz.vutbr.fit.hospitu.controller.LoginController;
import cz.vutbr.fit.hospitu.controller.RegisterController;
import cz.vutbr.fit.hospitu.controller.UserController;
import cz.vutbr.fit.hospitu.controller.UserSearchController;
import cz.vutbr.fit.hospitu.controller.admin.RoleController;
import cz.vutbr.fit.hospitu.controller.doctor.DoctorController;
import cz.vutbr.fit.hospitu.controller.doctor.FilesController;
import cz.vutbr.fit.hospitu.controller.doctor.TicketController;
import cz.vutbr.fit.hospitu.controller.patient.PatientInfoController;
import cz.vutbr.fit.hospitu.controller.validator.ValidationException;
import cz.vutbr.fit.hospitu.data.response.generic.Generic400ResponseData;
import cz.vutbr.fit.hospitu.data.response.generic.Generic500ResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import cz.vutbr.fit.hospitu.sql.table.Tables;
import io.javalin.Javalin;
import io.javalin.apibuilder.ApiBuilder;
import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.util.ssl.SslContextFactory;

import java.util.Set;

public class Main
{
    public static void main(String[] args)
    {
        try
        {
            var serverConfig = ServerConfigLoader.load();

            if (serverConfig == null)
            {
                System.err.println("Failed to load the server config, exiting.");
                return;
            }

            SQLConnection.initialize(serverConfig);

            try (var connection = SQLConnection.create())
            {
                Tables.initialize(connection);
            }

            Javalin app = Javalin.create(config -> {
                config.server(() -> {
                    Server server = new Server();
                    ServerConnector sslConnector = new ServerConnector(server, getSslContextFactory(serverConfig));
                    sslConnector.setPort(serverConfig.getHttpPort());
                    server.setConnectors(new Connector[]{ sslConnector });
                    return server;
                });

                config.accessManager(APIAccessManager::manage);
                config.defaultContentType = "application/json";
                config.enableCorsForAllOrigins();
                config.enforceSsl = true;
            });
            app.exception(ValidationException.class, (exception, ctx) -> {});
            app.error(500, ctx -> ctx.json(new Generic500ResponseData()));
            app.error(400, ctx -> ctx.json(new Generic400ResponseData()));
            app.routes(() -> {
                ApiBuilder.path("users", () -> {
                    ApiBuilder.post("login", LoginController::postLogin, Set.of(EnumAPIRole.ANONYMOUS));

                    ApiBuilder.put("register", RegisterController::putRegister, Set.of(EnumAPIRole.ANONYMOUS));

                    ApiBuilder.get("search", UserSearchController::getSearch, Set.of(EnumAPIRole.DOCTOR, EnumAPIRole.INSURANCE_WORKER));

                    ApiBuilder.get("search-detail", UserSearchController::getSearchDetailed, Set.of(EnumAPIRole.DOCTOR, EnumAPIRole.INSURANCE_WORKER));

                    ApiBuilder.path("@self", () -> {
                        ApiBuilder.get("profile", UserController::getSelfUserProfile, Set.of(EnumAPIRole.PATIENT));

                        ApiBuilder.get("profile-detail", UserController::getSelfUserProfileDetail, Set.of(EnumAPIRole.PATIENT));

                        ApiBuilder.patch("profile-update", UserController::updateSelfUserProfile, Set.of(EnumAPIRole.PATIENT));

                        ApiBuilder.get("patient-info", PatientInfoController::getPatientSelfInfo, Set.of(EnumAPIRole.PATIENT));
                    });

                    ApiBuilder.path(":user-id", () -> {
                        ApiBuilder.get("profile", UserController::getUserProfile, Set.of(EnumAPIRole.ANONYMOUS));

                        ApiBuilder.get("profile-detail", UserController::getUserProfileDetail, Set.of(EnumAPIRole.DOCTOR, EnumAPIRole.INSURANCE_WORKER));

                        ApiBuilder.patch("profile-update", UserController::updateUserProfile, Set.of(EnumAPIRole.ADMIN));

                        ApiBuilder.patch("update-role", RoleController::patchChangeRole, Set.of(EnumAPIRole.ADMIN));
                    });
                });

                ApiBuilder.path("hFile", () -> {
                    ApiBuilder.path("info", () -> {
                        ApiBuilder.get(FilesController::getFiles, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path("patients", () -> {
                        ApiBuilder.get(FilesController::getPatient, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path("create", () -> {
                        ApiBuilder.put(FilesController::putFiles, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path("switch", () -> {
                        ApiBuilder.put(FilesController::putChangeDoctor, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path(":ptch-id", () -> {
                        ApiBuilder.patch("file-update", FilesController::updateFile, Set.of(EnumAPIRole.DOCTOR));

                        ApiBuilder.patch("file-report-update", FilesController::updateFileReport, Set.of(EnumAPIRole.DOCTOR));
                    });
                });

                 ApiBuilder.path("admin", () -> {
                    ApiBuilder.path("change", () -> {
                        ApiBuilder.post(AdminControllerWriteDoc::getAdmins, Set.of(EnumAPIRole.ADMIN));
                    });
                    ApiBuilder.path("changep", () -> {
                        ApiBuilder.post(AdminControllerWritePoj::getAdmins, Set.of(EnumAPIRole.ADMIN));
                    });
                    ApiBuilder.path("info", () -> {
                        ApiBuilder.get(AdminControllerTable::getAdmins, Set.of(EnumAPIRole.ADMIN));
                    });
                    ApiBuilder.path("deleted", () -> {
                        ApiBuilder.post(AdminControllerDeleteDoctor::getAdmins, Set.of(EnumAPIRole.ADMIN));
                    });
                    ApiBuilder.path("deletep", () -> {
                        ApiBuilder.post(AdminControllerDeletePoj::getAdmins, Set.of(EnumAPIRole.ADMIN));
                    });
                    ApiBuilder.path("deletepac", () -> {
                        ApiBuilder.post(AdminControllerDeletePacient::getAdmins, Set.of(EnumAPIRole.ADMIN));
                    });
                });

                ApiBuilder.path("doctors", () -> {
                    ApiBuilder.path("info", () -> {
                        ApiBuilder.get(DoctorController::getDoctorInfo, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path("files", () -> {
                        ApiBuilder.get(DoctorController::getDoctorFiles, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path("practitioners", () -> {
                        ApiBuilder.get(DoctorController::getPractitioners, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path("un-patients", () -> {
                        ApiBuilder.get(DoctorController::getUnPatients, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path("patients", () -> {
                        ApiBuilder.get(DoctorController::getPatients, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path(":un_pid", () -> {
                        ApiBuilder.put("move-patient",DoctorController::movePatient, Set.of(EnumAPIRole.DOCTOR));

                        ApiBuilder.patch("update-patient",DoctorController::updatePatient, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path("create-patient", () -> {
                        ApiBuilder.put(DoctorController::putPatient, Set.of(EnumAPIRole.DOCTOR));
                    });
                });

                ApiBuilder.path("tickets", () -> {
                    ApiBuilder.path("info", () -> {
                        ApiBuilder.get(TicketController::getTickets, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path("create", () -> {
                        ApiBuilder.put(TicketController::putTickets, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path("insurance", () -> {
                        ApiBuilder.put(TicketController::putIRequest, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path("switch", () -> {
                        ApiBuilder.put(TicketController::putChangeDoctor, Set.of(EnumAPIRole.DOCTOR));
                    });

                    ApiBuilder.path(":cr-id", () -> {
                        ApiBuilder.patch("ticket-update", TicketController::updateFileTicket, Set.of(EnumAPIRole.DOCTOR));

                        ApiBuilder.patch("ticket-report-update", TicketController::updateFileTicketReport, Set.of(EnumAPIRole.DOCTOR));
                    });
                });
            });

            app.start(serverConfig.getHttpPort());
        }
        catch (Exception e)
        {
            System.err.println("The following error has occurred while initializing the server:");
            e.printStackTrace();
        }
    }

    private static SslContextFactory getSslContextFactory(ServerConfigLoader.ServerConfig config) {
        var keyStore = Main.class.getResource("/keystore.jks").toExternalForm();

        SslContextFactory sslContextFactory = new SslContextFactory.Server();
        sslContextFactory.setKeyStorePath(keyStore);
        sslContextFactory.setKeyStorePassword(config.getKeyStorePassword());
        sslContextFactory.setTrustStorePath(keyStore);
        sslContextFactory.setTrustStorePassword(config.getKeyStorePassword());
        return sslContextFactory;
    }
}
