import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


import java.sql.*;

public class StudentDatabaseExample {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydatabase", user = "root", password = "";
        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            stmt.executeUpdate("CREATE TABLE IF NOT EXISTS Student (USN VARCHAR(10) PRIMARY KEY, Name VARCHAR(100), Semester INT, CGPA DECIMAL(3, 2))");
            String[] insertData = {
                "('1RV20CS001', 'Alice', 5, 8.5)", "('1RV20CS002', 'Bob', 4, 7.5)",
                "('1RV20CS003', 'Charlie', 5, 9.0)", "('1RV20CS004', 'David', 6, 6.8)",
                "('1RV20CS005', 'Eve', 5, 7.9)"
            };
            for (String data : insertData) stmt.executeUpdate("INSERT INTO Student (USN, Name, Semester, CGPA) VALUES " + data);

            displayResults(stmt, "SELECT * FROM Student", "All students:");
            displayResults(stmt, "SELECT * FROM Student WHERE Semester = 5", "5th Semester students:");
            displayResults(stmt, "SELECT * FROM Student WHERE Semester = 5 AND CGPA > 8.0", "5th Semester students with CGPA > 8.0:");
            System.out.println("Total students with CGPA > 8.0: " + getCount(stmt, "SELECT COUNT(*) FROM Student WHERE CGPA > 8.0"));
        }
    }

    private static void displayResults(Statement stmt, String query, String message) throws SQLException {
        System.out.println("\n" + message);
        ResultSet rs = stmt.executeQuery(query);
        while (rs.next()) System.out.printf("%s\t%s\t%d\t%.2f%n", rs.getString("USN"), rs.getString("Name"), rs.getInt("Semester"), rs.getDouble("CGPA"));
    }

    private static int getCount(Statement stmt, String query) throws SQLException {
        ResultSet rs = stmt.executeQuery(query);
        rs.next();
        return rs.getInt(1);
    }
}