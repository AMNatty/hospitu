package db;

import java.sql.*;

public class jdbc {

    public static void connect() {
        try {
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/hospital", "admin", "admin01");
        }catch (SQLException err) {
            System.out.println(err.getMessage());
        }
    }
    
}