DROP TABLE print_billing_db.auth;

CREATE TABLE print_billing_db.auth (
	id int NOT NULL auto_increment,
    primary key(id),
    username varchar(60) UNIQUE,
    email varchar(100) UNIQUE,
	password varchar(60)
);

DROP TABLE print_billing_db.users;


CREATE TABLE print_billing_db.users (
    id int NOT NULL,
    primary key(id),
    username varchar(60) UNIQUE,
    email varchar(100) UNIQUE,
);

