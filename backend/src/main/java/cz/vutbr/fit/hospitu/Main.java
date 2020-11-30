package cz.vutbr.fit.hospitu;

import cz.vutbr.fit.hospitu.access.APIAccessManager;
import cz.vutbr.fit.hospitu.access.EnumAPIRole;
import cz.vutbr.fit.hospitu.controller.LoginController;
import cz.vutbr.fit.hospitu.controller.RegisterController;
import cz.vutbr.fit.hospitu.controller.RoleController;
import cz.vutbr.fit.hospitu.controller.UserController;
import cz.vutbr.fit.hospitu.controller.*;
import cz.vutbr.fit.hospitu.data.response.Generic400ResponseData;
import cz.vutbr.fit.hospitu.data.response.Generic500ResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import cz.vutbr.fit.hospitu.sql.table.Tables;
import io.javalin.Javalin;
import io.javalin.apibuilder.ApiBuilder;

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
                config.accessManager(APIAccessManager::manage);
                config.defaultContentType = "application/json";
                config.enableCorsForAllOrigins();
            });
            app.error(500, ctx -> ctx.json(new Generic500ResponseData()));
            app.error(400, ctx -> ctx.json(new Generic400ResponseData()));
            app.routes(() -> {
                ApiBuilder.path("users", () -> {
                    ApiBuilder.post("login", LoginController::postLogin, Set.of(EnumAPIRole.ANONYMOUS));

                    ApiBuilder.put("register", RegisterController::putRegister, Set.of(EnumAPIRole.ANONYMOUS));

                    ApiBuilder.path("@self", () -> {
                        ApiBuilder.path("profile", () -> {
                            ApiBuilder.get(UserController::getSelfUserProfile, Set.of(EnumAPIRole.PATIENT));
                        });
                    });

                    ApiBuilder.path(":user-id", () -> {
                        ApiBuilder.path("profile", () -> {
                            ApiBuilder.get(UserController::getUserProfile, Set.of(EnumAPIRole.ANONYMOUS));
                        });

                        ApiBuilder.path("update-role", () -> {
                            ApiBuilder.patch(RoleController::patchChangeRole, Set.of(EnumAPIRole.ADMIN));
                        });
                    });
                });
                ApiBuilder.path("hFile", () -> {
                    ApiBuilder.path("info", () -> {
                        ApiBuilder.get(FilesController::getFiles, Set.of(EnumAPIRole.DOCTOR));
                    });
                    ApiBuilder.path("patients", () -> {
                        ApiBuilder.get(FilesController::getPatient, Set.of(EnumAPIRole.DOCTOR));
                    });
                });
                ApiBuilder.path("doctors", () -> {
                    ApiBuilder.path("info", () -> {
                        ApiBuilder.get(DoctorController::getDoctorInfo, Set.of(EnumAPIRole.DOCTOR));
                    });
                    ApiBuilder.path("files", () -> {
                        ApiBuilder.get(DoctorController::getDoctorFiles, Set.of(EnumAPIRole.DOCTOR));
                    });
                });
                ApiBuilder.path("tickets", () -> {
                    ApiBuilder.path("info", () -> {
                        ApiBuilder.get(TicketController::getTickets, Set.of(EnumAPIRole.DOCTOR));
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
}
