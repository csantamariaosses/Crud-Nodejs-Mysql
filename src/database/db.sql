create database crud_node_mysql;

use crud_node_mysql;

create table customer (
    id int(6) unsigned AUTO_INCREMENT NOT null PRIMARY KEY,
    name varchar(50) not null,
    address varchar(100) not null,
    phone varchar(20) not null
);

show tables;

describe customer;

