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


import java.sql.*;

public class EmployeeDatabaseExample {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydatabase", user = "root", password = "";
        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            stmt.executeUpdate("CREATE TABLE IF NOT EXISTS Employee (ID INT PRIMARY KEY, FName VARCHAR(50), LName VARCHAR(50), Project VARCHAR(100), Salary DECIMAL(10, 2))");
            String[] insertData = {
                "(1, 'Alice', 'Smith', 'Web Development', 80000)", "(2, 'Bob', 'Johnson', 'Mobile App', 50000)",
                "(3, 'Charlie', 'Williams', 'Web Development', 90000)", "(4, 'David', 'Brown', 'Cloud Computing', 45000)",
                "(5, 'Eve', 'Davis', 'Web Development', 40000)"
            };
            for (String data : insertData) stmt.executeUpdate("INSERT INTO Employee (ID, FName, LName, Project, Salary) VALUES " + data);

            displayResults(stmt, "SELECT * FROM Employee", "All employees:");
            displayResults(stmt, "SELECT * FROM Employee WHERE Project = 'Web Development'", "Web Development employees:");
            displayIDs(stmt, "SELECT ID FROM Employee WHERE Project = 'Web Development' AND Salary > 75000", "Employees with salary > 75,000 in Web Development:");
            System.out.println("Total employees with salary < 50,000: " + getCount(stmt, "SELECT COUNT(*) FROM Employee WHERE Salary < 50000"));
        }
    }

    private static void displayResults(Statement stmt, String query, String message) throws SQLException {
        System.out.println("\n" + message);
        ResultSet rs = stmt.executeQuery(query);
        while (rs.next()) System.out.printf("%d\t%s\t%s\t%s\t%.2f%n", rs.getInt("ID"), rs.getString("FName"), rs.getString("LName"), rs.getString("Project"), rs.getDouble("Salary"));
    }

    private static void displayIDs(Statement stmt, String query, String message) throws SQLException {
        System.out.println("\n" + message);
        ResultSet rs = stmt.executeQuery(query);
        while (rs.next()) System.out.println("ID: " + rs.getInt("ID"));
    }

    private static int getCount(Statement stmt, String query) throws SQLException {
        ResultSet rs = stmt.executeQuery(query);
        rs.next();
        return rs.getInt(1);
    }
}

car

import java.sql.*;

public class CarDatabaseExample {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydatabase", user = "root", password = "";
        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            stmt.executeUpdate("CREATE TABLE IF NOT EXISTS Car (Model VARCHAR(50), Company VARCHAR(50), Price DECIMAL(10, 2), Year INT, PRIMARY KEY (Model, Year))");
            String[] insertData = {
                "('ABC', 'Toyota', 150000, 2010)", "('XYZ', 'Honda', 200000, 2018)"
            };
            for (String data : insertData) stmt.executeUpdate("INSERT INTO Car (Model, Company, Price, Year) VALUES " + data);

            displayResults(stmt, "SELECT * FROM Car", "All cars:");
            stmt.executeUpdate("INSERT INTO Car (Model, Company, Price, Year) VALUES ('DEF', 'Tesla', 300000, 2021)");
            displayResults(stmt, "SELECT * FROM Car", "After adding Tesla:");
            stmt.executeUpdate("DELETE FROM Car WHERE Model = 'ABC' AND Year = 2010");
            displayResults(stmt, "SELECT * FROM Car", "After deleting ABC model:");
            stmt.executeUpdate("UPDATE Car SET Price = 125000 WHERE Price = 150000");
            displayResults(stmt, "SELECT * FROM Car", "After updating price of Toyota:");
        }
    }

    private static void displayResults(Statement stmt, String query, String message) throws SQLException {
        System.out.println("\n" + message);
        ResultSet rs = stmt.executeQuery(query);
        while (rs.next()) System.out.printf("%s\t%s\t%.2f\t%d%n", rs.getString("Model"), rs.getString("Company"), rs.getDouble("Price"), rs.getInt("Year"));
    }
}

// Import necessary libraries
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const users = []; // Temporary in-memory storage (use a database in production)
const SECRET_KEY = 'your_secret_key_here'; // Replace with a strong secret key in production

app.use(bodyParser.json());

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user
    const user = { username, password: hashedPassword };
    users.push(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = users.find(user => user.username === username);
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ message: 'Invalid password' });

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Protected route
app.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Access denied' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Access granted', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));