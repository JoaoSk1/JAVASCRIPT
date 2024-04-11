create table aluno (
    id int primary key not null,
    nome varchar(30) not null,
    sobrenome varchar(30),
    periodo int not null,
    observacao varchar(100)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    salt TEXT NOT NULL,
    password TEXT NOT NULL
);