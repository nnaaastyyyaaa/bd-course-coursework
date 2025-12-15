SELECT * from orders
WHERE order_price > 1000

SELECT * from product
WHERE stock_status = 'in stock'

SELECT * from address
WHERE country = 'Ukraine' AND city = 'Odessa'

SELECT last_name||' '||first_name as full_name, phone_number from worker
WHERE worker_role = 'admin'

INSERT INTO orders (order_date, order_price, status, discount, client_id, address_id, worker_id) VALUES (
'2025-11-01', 990, 'confirmed', 0, 13, 18, 8) ;

SELECT * FROM orders 

INSERT INTO shipment (carrier, tracking_number, shipment_status, shipping_date, delivery_address, order_id, worker_id) VALUES (
'УКРПОШТА', '734832987654321', 'processing', '2025-11-03', 'м.Оеса, Дерибасівська 15', 12, 9
)

SELECT * FROM shipment

UPDATE product
SET price=50000
WHERE product_id = 5;

SELECT * FROM product
WHERE product_id = 5

UPDATE product
SET stock_status = 'in stock'
WHERE product_id = 6

SELECT * FROM product
WHERE product_id = 6

INSERT INTO address (country, city, street, postal_code, client_id)
VALUES ('Ukraine', 'Lviv', 'Street, 45' , 65007, 15 );

UPDATE orders
SET address_id=21
WHERE order_id=10


DELETE FROM address
WHERE address_id = 22;

SELECT * FROM address;

SELECT * FROM orders