CREATE TABLE users(
    username VARCHAR(25) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    state VARCHAR(25) NOT NULL,
    description VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL,
    "completedAt" TIMESTAMP,
    username VARCHAR(25),
    FOREIGN KEY(username) REFERENCES USERS (username)
);
