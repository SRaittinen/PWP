CREATE TABLE events(
    eventId INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL UNIQUE,
    address varchar(100) NOT NULL,
    date DATE NOT NULL
) ENGINE=InnoDB CHARACTER SET utf8;

CREATE TABLE competitors(
    competitorId INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL UNIQUE,
    age INT NOT NULL
) ENGINE=InnoDB CHARACTER SET utf8;

CREATE TABLE times(
    timeId INT AUTO_INCREMENT PRIMARY KEY,
    time FLOAT NOT NULL,
    eventName varchar(100) NOT NULL,
    competitorName varchar(100) NOT NULL,
    CONSTRAINT fk_event
    FOREIGN KEY (eventName)
    REFERENCES events(name)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_competitor
    FOREIGN KEY (competitorName)
    REFERENCES competitors(name)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8;
