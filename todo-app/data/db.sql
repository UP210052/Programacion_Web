CREATE DATABASE todoApp;

use todoApp;
CREATE TABLE `user` (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
); 

CREATE TABLE `task` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    completed tinyint(1) DEFAULT 0,
    idUser INT(11),
    foreign key(idUser) references `user`(id)
);

insert into `user` (firstname, lastname, email) values ('Rogelio', 'Trejo', 'rogelio.trejo@test.com');