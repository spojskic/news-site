CREATE SCHEMA `dbinfo_122`;

USE `dbinfo_122`;

CREATE TABLE users
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username NVARCHAR(50) UNIQUE NOT NULL,
    password NVARCHAR(100) NOT NULL,
    role NVARCHAR(20) NOT NULL,
    status NVARCHAR(15) NOT NULL
);

CREATE TABLE news
(
	id INT PRIMARY KEY AUTO_INCREMENT,
    title NVARCHAR(100) NOT NULL,
    description NVARCHAR(5000) NOT NULL,
	imageURL NVARCHAR(1500) NOT NULL
);

CREATE TABLE comments
(
	id INT PRIMARY KEY AUTO_INCREMENT,
    comment NVARCHAR(1000) NOT NULL,
    newsId INT,
    CONSTRAINT FK_CommentNews FOREIGN KEY (newsId) REFERENCES news (id),
    userId INT,
    CONSTRAINT FK_CommentUser FOREIGN KEY (userId) REFERENCES users (id)
);

INSERT INTO users(username, password, role, status) VALUE('admin', 'admin', 'admin', 'aktivan');
INSERT INTO users(username, password, role, status) VALUE('test', 'test', 'user', 'aktivan');
SELECT * FROM users;

INSERT INTO news(title, description, imageURL) VALUE('testna novost', 'kjhashkjfgs gsgg dfgdf gdfgdgdf gdfgsdgdf gfdgdfgfd dsfewf fdsfsdfsd gfdgdf', 'www.test.com');
INSERT INTO news(title, description, imageURL) VALUE('testna novost 2', 'kjhashkjfgs gsgg dfgdf gdfgdgdf gdfgsdgdf gfdgdfgfd dsfewf fdsfsdfsd gfdgdf', 'www.test2.com');
INSERT INTO news(title, description, imageURL) VALUE('testna novost 3', 'kjhashkjfgs gsgg dfgdf gdfgdgdf gdfgsdgdf gfdgdfgfd dsfewf fdsfsdfsd gfdgdf', 'www.test3.com');
SELECT * FROM news;

INSERT INTO comments(comment, newsId, userId) VALUE('testni komentar', 1, 1);
INSERT INTO comments(comment, newsId, userId) VALUE('testni komentar 2', 1, 1);
INSERT INTO comments(comment, newsId, userId) VALUE('testni komentar 3', 1, 1);
INSERT INTO comments(comment, newsId, userId) VALUE('testni komentar 4', 2, 1);
INSERT INTO comments(comment, newsId, userId) VALUE('testni komentar 5', 2, 1);
SELECT * FROM comments;

SELECT * FROM users INNER JOIN comments ON users.id = comments.userId INNER JOIN news ON comments.newsId = news.id;
