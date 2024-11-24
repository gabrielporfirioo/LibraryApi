CREATE DATABASE livraria;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';

GRANT ALL PRIVILEGES ON livraria.* TO 'admin'@'localhost';

FLUSH PRIVILEGES;
USE livraria;