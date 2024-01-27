DROP DATABASE IF EXISTS MoonboatGrocery;
CREATE DATABASE MoonboatGrocery;
USE MoonboatGrocery;

DROP TABLE IF EXISTS contact_info;
DROP TABLE IF EXISTS shopping_cart;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
id INT AUTO_INCREMENT,
name VARCHAR(50), 
email VARCHAR(50),
password VARCHAR(500),
CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE product (
id INT AUTO_INCREMENT,
cate_id INT,
name VARCHAR(50),
price DOUBLE,
`desc` VARCHAR(200), 
img VARCHAR(200), 
CONSTRAINT pk_product PRIMARY KEY (id)
);

CREATE TABLE shopping_cart ( 
id INT AUTO_INCREMENT,
user_id INT,
product_id INT,
qty INT,
CONSTRAINT pk_shopcart PRIMARY KEY (id),
CONSTRAINT fk_shopcart_user FOREIGN KEY (user_id) REFERENCES
user (id),
CONSTRAINT fk_shopcart_prod FOREIGN KEY (product_id)
REFERENCES product (id) );

CREATE TABLE contact_info (
id INT AUTO_INCREMENT,
name VARCHAR(50), 
email VARCHAR(50),
phone BIGINT(10),
msg TEXT,
CONSTRAINT pk_contact_info PRIMARY KEY (id)
);

