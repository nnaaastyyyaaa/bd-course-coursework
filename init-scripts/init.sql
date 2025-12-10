CREATE TABLE IF NOT EXISTS client ( 
client_id serial PRIMARY KEY,
client_name varchar(32) NOT NULL,
last_name varchar(32) NOT NULL,
email varchar(32) NOT NULL CHECK (email LIKE '_%@_%._%'),
phone_number varchar(20)
);

CREATE TABLE IF NOT EXISTS address (
    address_id serial PRIMARY KEY,
    country varchar(32) NOT NULL,
    city varchar(32) NOT NULL,
    street varchar(32) NOT NULL,
    postal_code varchar(32) NOT NULL,
    client_id integer NOT NULL REFERENCES client(client_id)
);


CREATE TYPE role_name AS ENUM ('admin', 'courier', 'operator', 'manager');

CREATE TABLE IF NOT EXISTS worker (
worker_id serial PRIMARY KEY,
worker_role role_name NOT NULL,
first_name varchar(32) NOT NULL,
last_name varchar(32) NOT NULL,
phone_number varchar(13) UNIQUE
);

CREATE TYPE status_name AS ENUM ('confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');

CREATE TABLE IF NOT EXISTS orders (
order_id serial PRIMARY KEY,
order_date date NOT NULL DEFAULT CURRENT_DATE,
order_price integer NOT NULL CHECK (order_price >= 0),
status status_name NOT NULL,
discount integer CHECK (discount >= 0 AND discount <= 100),
client_id integer NOT NULL references client(client_id),
address_id integer NOT NULL references address(address_id),
worker_id integer NOT NULL references worker(worker_id)
);

CREATE TABLE IF NOT EXISTS category (
category_id serial PRIMARY KEY,
category_name varchar(32) NOT NULL,
description varchar(255) NOT NULL
);

CREATE TYPE stock_status_name AS ENUM ('in stock', 'out of stock', 'coming soon');

CREATE TABLE IF NOT EXISTS product (
product_id serial PRIMARY KEY,
product_name TEXT NOT NULL,
price integer NOT NULL CHECK (price >= 0),
quantity integer NOT NULL CHECK (quantity > 0),
description varchar(255) NOT NULL,
stock_status stock_status_name NOT NULL,
image_url TEXT ,
category_id integer NOT NULL REFERENCES category(category_id)
);

CREATE TABLE IF NOT EXISTS order_item (
    order_item_id serial PRIMARY KEY,
    quantity integer NOT NULL CHECK (quantity > 0),
    order_id integer NOT NULL REFERENCES orders(order_id),
    product_id integer NOT NULL REFERENCES product(product_id),
    CONSTRAINT unique_order_item UNIQUE (order_id, product_id)
);

CREATE TYPE methods AS ENUM ('by card', 'online', 'by cash on delivery');
CREATE TYPE payment_status_name AS ENUM ('paid', 'not paid');

CREATE TABLE IF NOT EXISTS payment (
    payment_id serial PRIMARY KEY,
    payment_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payment_method methods NOT NULL,
    payment_status payment_status_name NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    order_id integer NOT NULL REFERENCES orders(order_id)
);

CREATE TABLE IF NOT EXISTS shipment (
    shipment_id serial PRIMARY KEY,
    carrier TEXT,
    tracking_number TEXT UNIQUE,
    shipment_status VARCHAR(50) NOT NULL DEFAULT 'processing' CHECK (shipment_status IN ('processing', 'shipped', 'delivered', 'cancelled')),
    shipping_date DATE,
    delivery_address TEXT NOT NULL,
    order_id integer NOT NULL REFERENCES orders(order_id),
    worker_id integer REFERENCES worker(worker_id)
);