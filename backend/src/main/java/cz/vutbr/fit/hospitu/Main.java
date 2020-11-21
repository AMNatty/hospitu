package cz.vutbr.fit.hospitu;

import cz.vutbr.fit.hospitu.controller.LoginController;
import cz.vutbr.fit.hospitu.controller.UserController;
import cz.vutbr.fit.hospitu.data.response.Generic400ResponseData;
import cz.vutbr.fit.hospitu.data.response.Generic404ResponseData;
import cz.vutbr.fit.hospitu.data.response.Generic500ResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import cz.vutbr.fit.hospitu.sql.table.Tables;
import io.javalin.Javalin;
import io.javalin.apibuilder.ApiBuilder;

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
                config.defaultContentType = "application/json";
                config.enableCorsForAllOrigins();
            }).error(500, ctx -> {
                ctx.json(new Generic500ResponseData());
            }).error(400, ctx -> {
                ctx.json(new Generic400ResponseData());
            }).routes(() -> {
                ApiBuilder.path("users", () -> {
                    ApiBuilder.path("login", () -> {
                        ApiBuilder.post(LoginController::postLogin);
                    });

                    ApiBuilder.path(":user-id", () -> {
                        ApiBuilder.get(UserController::getUser);
                    });
                });
            }).start(serverConfig.getHttpPort());
        }
        catch (Exception e)
        {
            System.err.println("The following error has occurred while initializing the server:");
            e.printStackTrace();
        }
    }
}
