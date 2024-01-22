CREATE TABLE users (
  id serial PRIMARY KEY,
  name varchar(60) UNIQUE NOT NULL
);