CREATE TABLE USER(
    username VARCHAR(25) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE PROJECT (
    id SERIAL PRIMARY KEY,
    state VARCHAR(25) NOT NULL,
    description VARCHAR(255),
    createdAt TIMESTAMP NOT NULL,
    completedAt TIMESTAMP,
    user VARCHAR(25),
    FOREIGN KEY(user) REFERENCES USER (username)
);
