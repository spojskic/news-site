CREATE SCHEMA `dbinfo_122`;
USE `dbinfo_122`;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username NVARCHAR(50) UNIQUE NOT NULL,
    password NVARCHAR(500) NOT NULL,
    role NVARCHAR(20) NOT NULL,
    status NVARCHAR(15) NOT NULL
);
CREATE TABLE news (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title NVARCHAR(100) NOT NULL,
    description NVARCHAR(5000) NOT NULL,
    imageURL NVARCHAR(1500) NOT NULL
);
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    comment NVARCHAR(1000) NOT NULL,
    newsId INT,
    CONSTRAINT FK_CommentNews FOREIGN KEY (newsId) REFERENCES news (id),
    userId INT,
    CONSTRAINT FK_CommentUser FOREIGN KEY (userId) REFERENCES users (id)
);
INSERT INTO users(username, password, role, status) VALUE('admin', 'admin', 'admin', 'aktivan');