package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.access.AuthorizationManager;
import cz.vutbr.fit.hospitu.data.request.AdminRequest;
import cz.vutbr.fit.hospitu.data.request.LoginRequestData;
import cz.vutbr.fit.hospitu.data.response.AdminResponse;
import cz.vutbr.fit.hospitu.data.response.AdminResponseList;
import cz.vutbr.fit.hospitu.data.response.Generic404ResponseData;
import cz.vutbr.fit.hospitu.data.response.LoginResponseData;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import cz.vutbr.fit.hospitu.sql.table.Tables;
import io.javalin.http.Context;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AdminControllerRead {
    public static void getAdmins(Context context)
    {
        //var admin_data = context.bodyAsClass(AdminRequest.class); // vytahujes si z pozadavku

        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT * FROM users AS m
            """;

            try (var statement = connection.prepareStatement(sql))
            {
                //statement.setString(1, admin_data.getFirst_name());
                //statement.setString(2, admin_data.getLast_name());

                var result1 = statement.executeQuery();

                List<AdminResponse> admin_response_list = new ArrayList<>();

                while (result1.next())
                {
                    int us_id = result1.getInt("us_id");
                    admin_response_list.add(new AdminResponse(us_id, result1.getString("us_name"), result1.getString("us_surname"), result1.getString("us_login"), result1.getString("us_perms")));
                }

                context.status(200).json(new AdminResponseList(admin_response_list));

            }
        }

        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }
}
