INSERT INTO users (username, email, name, password) 
VALUES 
    ('john_doe', 'john.doe@example.com', 'John Doe', '$2a$10$abcdefg1234567890hashedpassword1'),
    ('jane_smith', 'jane.smith@example.com', 'Jane Smith', '$2a$10$hijklmn9876543210hashedpassword2'),
    ('mike_jones', 'mike.jones@example.com', 'Mike Jones', '$2a$10$opqrstuvwxyz09876hashedpassword3');


INSERT INTO todo (state, description, "createdAt", "completedAt", username)  
VALUES  
    ('INCOMPLETE', 'Buy groceries', '2025-02-22 10:00:00', NULL, 'john_doe'),  
    ('INCOMPLETE', 'Finish project report', '2025-02-21 15:30:00', NULL, 'jane_smith'),  
    ('INCOMPLETE', 'Call mom', '2025-02-20 18:45:00', NULL, 'jane_smith');
