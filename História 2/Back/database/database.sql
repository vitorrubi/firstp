CREATE DATABASE kanboom;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
	user_id UUID DEFAULT UUID_generate_v4(),
	user_name VARCHAR(255),
	user_email VARCHAR(255),
	user_password VARCHAR(255),
	  PRIMARY KEY(user_id)
);