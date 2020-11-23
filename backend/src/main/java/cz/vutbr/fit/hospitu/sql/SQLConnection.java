package cz.vutbr.fit.hospitu.sql;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import cz.vutbr.fit.hospitu.ServerConfigLoader;

import java.beans.PropertyVetoException;
import java.sql.Connection;
import java.sql.SQLException;

public class SQLConnection
{
    private static final int IDLE_CONNECTION_TEST_PERIOD = 60;
    private static final int MAX_CONNECTION_AGE = 60 * 60;

    private static ComboPooledDataSource dataSource;

    public static void initialize(ServerConfigLoader.ServerConfig serverConfig) throws ClassNotFoundException, PropertyVetoException
    {
        Class.forName("com.mysql.cj.jdbc.Driver");

        var otherOptions =
                  "?useUnicode=true"
                + "&useLegacyDatetimeCode=false"
                + "&useJDBCCompliantTimezoneShift=true"
                + "&autoReconnect=true"
                + "&serverTimezone=".concat(serverConfig.getDBTimeZone());

        String jdbcURL = String.format("jdbc:mysql://%s:%d/%s%s", serverConfig.getDBHost(), serverConfig.getDBPort(), serverConfig.getDBName(), otherOptions);

        String jdbcUser = serverConfig.getDBUser();
        String jdbcPass = serverConfig.getDBPassword();

        System.out.printf("JDBC URL: %s%n", jdbcURL);
        System.out.printf("JDBC user: %s%n", jdbcUser);
        System.out.printf("JDBC password: %s%n", "*".repeat(jdbcPass.length()));

        System.out.println("Creating a combo pooled data source...");

        dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass("com.mysql.cj.jdbc.Driver");
        dataSource.setIdleConnectionTestPeriod(IDLE_CONNECTION_TEST_PERIOD);
        dataSource.setTestConnectionOnCheckin(true);
        dataSource.setMaxConnectionAge(MAX_CONNECTION_AGE);
        dataSource.setJdbcUrl(jdbcURL);
        dataSource.setUser(jdbcUser);
        dataSource.setPassword(jdbcPass);
    }

    public static Connection create() throws SQLException
    {
        return dataSource.getConnection();
    }
}
