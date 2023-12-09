CREATE DATABASE Twitter_clonado;
USE Twitter_clonado;
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tweets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content VARCHAR(280) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Followers (
    follower_id INT,
    followed_id INT,
    FOREIGN KEY (follower_id) REFERENCES Users(id),
    FOREIGN KEY (followed_id) REFERENCES Users(id),
    PRIMARY KEY (follower_id, followed_id)
);

DELIMITER //

CREATE PROCEDURE `InsertUser`(IN _username VARCHAR(50), IN _email VARCHAR(100), IN _password VARCHAR(100))
BEGIN
    DECLARE exist INT DEFAULT 0;
    DECLARE inserted_id INT;

    SELECT COUNT(*) INTO exist FROM Users WHERE username = _username OR email = _email;
    IF exist = 0 THEN
        INSERT INTO Users(username, email, password) VALUES (_username, _email, _password);
        SET inserted_id = LAST_INSERT_ID();
        SELECT * FROM Users WHERE id = inserted_id;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nombre de usuario o email ya existen.';
    END IF;
END //

DELIMITER ;



DELIMITER //

CREATE PROCEDURE `UpdateUser`(IN _userId INT, IN _username VARCHAR(50), IN _email VARCHAR(100), IN _password VARCHAR(100))
BEGIN
    DECLARE exist INT DEFAULT 0;

    SELECT COUNT(*) INTO exist FROM Users WHERE (username = _username OR email = _email) AND id <> _userId;
    IF exist = 0 THEN
        UPDATE Users SET username = _username, email = _email, password = _password WHERE id = _userId;
        SELECT * FROM Users WHERE id = _userId; -- Devuelve el usuario actualizado
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre de usuario o el email ya están en uso por otro usuario.';
    END IF;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE `ListAllUsers`()
BEGIN
    SELECT * FROM Users;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE `ListUserById`(IN _userId INT)
BEGIN
    SELECT * FROM Users WHERE id = _userId;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE `ListUsersByUsername`(IN _username VARCHAR(50))
BEGIN
    SELECT * FROM Users WHERE username LIKE CONCAT('%', _username, '%');
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE `DeleteUser`(IN _userId INT)
BEGIN
    DELETE FROM Users WHERE id = _userId;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE `InsertTweet`(IN _userId INT, IN _content VARCHAR(280))
BEGIN
    INSERT INTO Tweets(user_id, content) VALUES (_userId, _content);
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE `UpdateTweet`(IN _tweetId INT, IN _content VARCHAR(280))
BEGIN
    UPDATE Tweets SET content = _content WHERE id = _tweetId;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE `DeleteTweet`(IN _tweetId INT)
BEGIN
    DELETE FROM Tweets WHERE id = _tweetId;
END //

DELIMITER ;
DELIMITER //

CREATE PROCEDURE `ListTweetsByUser`(IN _userId INT)
BEGIN
    SELECT * FROM Tweets WHERE user_id = _userId ORDER BY created_at DESC;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE `FollowUser`(IN _followerId INT, IN _followedId INT)
BEGIN
    IF _followerId != _followedId THEN
        INSERT INTO Followers(follower_id, followed_id) VALUES (_followerId, _followedId);
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Un usuario no puede seguirse a sí mismo.';
    END IF;
END //

DELIMITER ;
DELIMITER //
CREATE PROCEDURE `UnfollowUser`(IN _followerId INT, IN _followedId INT)
BEGIN
    DELETE FROM Followers WHERE follower_id = _followerId AND followed_id = _followedId;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE `GetFollowers`(IN _userId INT)
BEGIN
    SELECT username FROM Users
    INNER JOIN Followers ON Users.id = Followers.follower_id
    WHERE Followers.followed_id = _userId;
END //

CREATE PROCEDURE `GetFollowing`(IN _userId INT)
BEGIN
    SELECT username FROM Users
    INNER JOIN Followers ON Users.id = Followers.followed_id
    WHERE Followers.follower_id = _userId;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE `VerifyUserLogin`(IN _username VARCHAR(255))
BEGIN
    SELECT id, username, password FROM Users WHERE username = _username;
END //

DELIMITER ;


