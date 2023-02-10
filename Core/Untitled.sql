DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

DROP USER IF EXISTS 'John'@'localhost';
CREATE USER 'John'@'localhost' IDENTIFIED BY 'Doe';

GRANT ALL PRIVILEGES ON user_db.* TO 'John'@'localhost';

USE user_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, email, password)
VALUES
  ('user1', 'user1@example.com', 'pass1'),
  ('user2', 'user2@example.com', 'pass2'),
  ('user3', 'user3@example.com','pass3');

SELECT * FROM users;