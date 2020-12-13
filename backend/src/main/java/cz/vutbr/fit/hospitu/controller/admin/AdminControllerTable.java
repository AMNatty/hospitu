package cz.vutbr.fit.hospitu.controller.admin;

import cz.vutbr.fit.hospitu.data.response.AdminResponseAdminTable;
import cz.vutbr.fit.hospitu.data.response.AdminResponseAdminTableList;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AdminControllerTable {
    public static void getAdmins(Context context)
    {
        try (var connection = SQLConnection.create())
        {
            String sql = """
            SELECT * FROM users AS m
            """;

            try (var statement = connection.prepareStatement(sql))
            {
                var result = statement.executeQuery();

                List<AdminResponseAdminTable> AdminListData = new ArrayList<>();

                while(result.next())
                {
                    int admin = result.getInt("us_id");
                    AdminListData.add(new AdminResponseAdminTable(
                            admin,
                            result.getString("us_name"),
                            result.getString("us_surname"),
                            result.getString("us_login"),
                            result.getString("us_perms")
                    ));
                }

                context.status(200).json(new AdminResponseAdminTableList(AdminListData));
            }
        }

        catch (SQLException e)
        {
            e.printStackTrace();
            context.status(500);
        }
    }
}

