create database vapp5;
use vapp5;

create table customer(
customer_id int auto_increment primary key,
company varchar(64),
contact varchar(64),
email varchar(32),
phone_number varchar(20)
);
INSERT INTO `customer` VALUES (1,'APR','Benjamin','informatique@apr.eu','0478023365'),(2,'APR','Toto','informatique@apr.eu','06369202111'),(3,'APR','Benjamin','benjamin@apr.eu','0659779794'),(4,'APR','Arnaud','alouvel@apr.eu','0478023351'),(5,'Admin','Benjamin Menghini','admin@admin.fr','0478023365'),(6,'TARDY','Yannick Gerphagnon','ygerphagnon@tardy.fr','0478023365'),(7,'GE','Nadine Morelo','n.morello@ge.com','0472685241'),(8,'IVECO','Loic Masson','loic.masson@iveco.com','0475962584'),(9,'ECAR','Marc Thomas','mthomas@ecar.fr','0467856931');

create table users(
user_id int auto_increment primary key,
login varchar(64),
password varchar(64),
customer int,
role varchar(5),
foreign key (customer) references customer(customer_id)
);
INSERT INTO `users` VALUES (1,'informatique@apr.eu','mozilla69',1,'APR'),(3,'benjamin@apr.eu','toto',3,'guest'),(4,'alouvel@apr.eu','toto',4,'guest'),(5,'admin@admin.fr','admin',5,'guest'),(6,'ygerphagnon@tardy.fr','tardy',6,'guest');

create table mo(
mo varchar(64) primary key,
client varchar(32),
product varchar(64));

create table control(
control_id int auto_increment primary key,
min int,
max int,
control int,
mo varchar(64),
foreign key (mo) references mo(mo));

create table issue(
issue_id int auto_increment primary key,
type varchar(32),
description text,
mo varchar(64),
foreign key (mo) references mo(mo));

create table sessions(
session_id varchar(128) primary key,
expires int,
data text);