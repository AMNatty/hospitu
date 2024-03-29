package cz.vutbr.fit.hospitu.controller;

import cz.vutbr.fit.hospitu.access.EnumAPIRole;
import cz.vutbr.fit.hospitu.data.response.impl.UserSearchResponseData;
import cz.vutbr.fit.hospitu.data.response.impl.UserSearchResult;
import cz.vutbr.fit.hospitu.data.response.impl.UserSearchResultDetail;
import cz.vutbr.fit.hospitu.sql.SQLConnection;
import io.javalin.http.Context;

import java.sql.Date;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

public class UserSearchController
{
    public static void getSearch(Context context)
    {
        var query = context.queryParam("name");
        var role = EnumAPIRole.getByDBName(context.queryParam("role"));

        var roles = role != null ? role.getCumulativePermissions() : EnumSet.allOf(EnumAPIRole.class);

        SQLConnection.createTransaction(context, connection -> {
            var sql = """
            SELECT us_id,
                us_name,
                us_surname,
                us_perms
            FROM users
            WHERE 
                (
                    LOWER(CONCAT(us_name, ' ', us_surname)) LIKE LOWER(?)
                        OR
                    LOWER(CONCAT(us_surname, ' ', us_name)) LIKE LOWER(?)
                )
                    AND
                us_perms IN ('$')
            ORDER BY us_surname, us_name
            LIMIT 50             
            """.replace("('$')", roles.stream()
                .map(EnumAPIRole::getDBName)
                .filter(Objects::nonNull)
                .map(name -> String.format("'%s'", name))
                .collect(Collectors.joining(",", "(", ")")));

            // When is Java getting string interpolation? >:(

            try (var statement = connection.prepareStatement(sql))
            {
                statement.setString(1, query + "%");
                statement.setString(2, query + "%");

                var resultSet = statement.executeQuery();

                var searchResults = new ArrayList<UserSearchResult>();

                while (resultSet.next())
                {
                    searchResults.add(new UserSearchResult(
                        resultSet.getInt("us_id"),
                        resultSet.getString("us_name"),
                        resultSet.getString("us_surname"),
                        EnumAPIRole.getByDBName(resultSet.getString("us_perms"))
                    ));
                }

                context.status(200).json(new UserSearchResponseData(
                    searchResults
                ));
            }
        });
    }

    public static void getSearchDetailed(Context context)
    {
        var query = context.queryParam("name");
        var role = EnumAPIRole.getByDBName(context.queryParam("role"));

        var roles = role != null ? EnumSet.of(role) : EnumSet.allOf(EnumAPIRole.class);

        SQLConnection.createTransaction(context, connection -> {
            var sql = """
            SELECT us_id,
                us_name,
                us_surname,
                us_perms,
                uci_birthdate
            FROM users
                LEFT JOIN usercontactinfo u on users.us_id = u.uci_us_id
            WHERE 
                (
                    LOWER(CONCAT(us_name, ' ', us_surname)) LIKE LOWER(?)
                        OR
                    LOWER(CONCAT(us_surname, ' ', us_name)) LIKE LOWER(?)
                )
                    AND
                us_perms IN ('$')
            ORDER BY us_surname, us_name
            LIMIT 50             
            """.replace("('$')", roles.stream()
                .map(EnumAPIRole::getDBName)
                .filter(Objects::nonNull)
                .map(name -> String.format("'%s'", name))
                .collect(Collectors.joining(",", "(", ")")));

            // When is Java getting string interpolation? >:(

            try (var statement = connection.prepareStatement(sql))
            {
                statement.setString(1, query + "%");
                statement.setString(2, query + "%");

                var resultSet = statement.executeQuery();

                var searchResults = new ArrayList<UserSearchResultDetail>();

                var formatter = DateTimeFormatter.ISO_DATE;

                while (resultSet.next())
                {
                    searchResults.add(new UserSearchResultDetail(
                        resultSet.getInt("us_id"),
                        resultSet.getString("us_name"),
                        resultSet.getString("us_surname"),
                        EnumAPIRole.getByDBName(resultSet.getString("us_perms")),
                        Optional.ofNullable(resultSet.getDate("uci_birthdate")).map(Date::toLocalDate).map(formatter::format).orElse(null)
                    ));
                }

                context.status(200).json(new UserSearchResponseData(
                    searchResults
                ));
            }
        });
    }
}
