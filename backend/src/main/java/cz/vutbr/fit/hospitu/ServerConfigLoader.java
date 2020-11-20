package cz.vutbr.fit.hospitu;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFilePermission;
import java.util.Set;

public class ServerConfigLoader
{
    private static final Path configFile = Path.of("settings.json");

    public static class ServerConfig
    {
        private int httpPort;

        private String dbHost;
        private int dbPort;
        private String dbName;
        private String dbUser;
        private String dbPassword;
        private String dbTimeZone;

        public int getHttpPort()
        {
            return this.httpPort;
        }

        public String getDBHost()
        {
            return this.dbHost;
        }

        public int getDBPort()
        {
            return this.dbPort;
        }

        public String getDBName()
        {
            return this.dbName;
        }

        public String getDBUser()
        {
            return this.dbUser;
        }

        public String getDBPassword()
        {
            return this.dbPassword;
        }

        public String getDBTimeZone()
        {
            return this.dbTimeZone;
        }
    }

    public static ServerConfig load() throws IOException
    {
        if (!Files.isRegularFile(configFile))
        {
            if (Files.exists(configFile))
            {
                System.err.println("The settings.json file is obstructed, could not create default settings!");

                return null;
            }

            var config = new ServerConfig();
            config.httpPort = -1;
            config.dbName = "insert the database name";
            config.dbHost = "insert the database host";
            config.dbPort = -1;
            config.dbUser = "insert the database user";
            config.dbPassword = "insert the database user's password";
            config.dbTimeZone = "CET";

            try (var out = Files.newBufferedWriter(configFile))
            {
                var gson = new GsonBuilder().setPrettyPrinting().create();
                gson.toJson(config, out);
            }

            try
            {
                Files.setPosixFilePermissions(configFile, Set.of(PosixFilePermission.OWNER_READ, PosixFilePermission.OWNER_WRITE));
            }
            catch (UnsupportedOperationException e)
            {
                // File system doesn't support POSIX perms
            }

            System.err.println("Generated default settings to 'settings.json', please fill them in and try again.");

            return null;
        }

        try (var in = Files.newBufferedReader(configFile))
        {
            var gson = new Gson();
            return gson.fromJson(in, ServerConfig.class);
        }
    }
}
