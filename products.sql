CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  ItemID INT AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(30) NOT NULL,
    DepartmentName VARCHAR(30) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT(10) NOT NULL,
    primary key(ItemID)
);

select * from products;

INSERT INTO products(ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Bamazon Echo","Bamazon Devices",169.99,50),
    ("Beats Solo2","Electronics",198.99,150),
    ("Eloquent Javascript","Food and Drink",22.50,100),
    ("Kindle","Electronics",119.99,45),
    ("Invicta Watch","Jewelery",79.99,12)
    