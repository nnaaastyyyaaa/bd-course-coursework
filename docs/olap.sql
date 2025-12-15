--загальна кількість замовлень
SELECT COUNT(*) AS total_orders 
FROM orders

--кількість адрес по кожній країні
SELECT country ,
COUNT(*) AS adressees
FROM address
GROUP BY country

--загальна кількість проданих ноутбуків
SELECT COUNT(*) as order_with_laptops,
SUM(quantity) as laptops_sold
FROM order_item
WHERE product_id = 5

--найдорожче замовлення
SELECT MAX(order_price) as the_cheapest_order
FROM orders

--кількість замовлень у кожному статусі
SELECT status ,
COUNT(*) 
FROM orders
GROUP BY status

--середня сума витрачених коштів на замовлення для кожного клієнта
SELECT client_id ,
ROUND(AVG(order_price), 2) as avg_spent
FROM orders
GROUP BY client_id

--кількість оплачених та неоплачених платежів на суму більше 1000
SELECT payment_status , COUNT(*) 
FROM payment
WHERE price > 1000
GROUP BY payment_status

--загальна кількість замовлень та загальна сума витрат для кожного клієнта
SELECT client_id , COUNT(*) as total_orders, SUM(order_price) as total_spent FROM orders
GROUP BY client_id

--клієнти та товари, які вони замовили
SELECT order_date, order_price, client_name||' '||last_name as full_name, email, phone_number, product_name FROM orders o
INNER JOIN client c
ON c.client_id = o.client_id
INNER JOIN order_item oi
ON oi.order_id = o.order_id
INNER JOIN product p
ON p.product_id = oi.product_id

--замовлення + дата + адреса
SELECT o.order_date, o.order_price, a.country, a.city, a.street, p.product_name FROM orders o
left join address a
on o.address_id = a.address_id
left JOIN order_item oi
ON o.order_id = oi.order_id
left JOIN product p
ON p.product_id = oi.product_id

--клієнти, які витратили на всі замовлення понад 5000 грн
SELECT c.client_id, SUM(o.order_price) AS total_spent FROM client c
left join orders o
on c.client_id = o.client_id
group by c.client_id
having SUM(o.order_price) > 5000

--міста, в які зроблено не менше ніж 2 замовлення
select a.city, COUNT(a.city) as total_orders from orders o
left join address a
on o.address_id = a.address_id
group by a.city
having COUNT(a.city) >= 2

--клієнти середня ціна замовлення яких більша, ніж середня ціна всіх замволень
SELECT * FROM client c
inner join orders o
on c.client_id = o.client_id
WHERE o.order_price > (SELECT AVG(order_price) FROM orders)

--клієнти, у яких є хоча б одне замовлення зі статусом “confirmed”
SELECT * FROM client c
WHERE c.client_id IN (SELECT client_id FROM orders
where status = 'confirmed')

--всі клієнти які мають таку ж адресу як клієнт з айді 8
select * from client c
left join address a
on c.client_id = a.client_id
where a.city in  (SELECT city from address
where client_id = 8) AND c.client_id != 8

--міста, де середня сума замовлень на клієнта більша за 1000.
SELECT * FROM (
SELECT city, sum(order_price)/count(order_id) as avg_per_person FROM address a 
left join orders o
on a.address_id = o.address_id
group by city
) as avg_per_person
where avg_per_person > 1000