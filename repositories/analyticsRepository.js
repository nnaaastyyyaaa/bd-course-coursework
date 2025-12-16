const prisma = require("../prisma/client");

exports.citiesAvgSumPerClientOver = async (number) =>
  await prisma.$queryRaw`
SELECT * FROM (
SELECT city, sum(order_price)::numeric/count(order_id) as avg_per_person FROM address a 
left join orders o
on a.address_id = o.address_id
group by city
) as avg_per_person
where avg_per_person > ${number}`;

exports.clientAvgPriceGreater = async () =>
  await prisma.$queryRaw`
SELECT * FROM client c 
inner join orders o 
on c.client_id = o.client_id 
WHERE o.order_price > (SELECT AVG(order_price) FROM orders)`;

exports.clientTotalSpentOver = async (number) =>
  await prisma.$queryRaw`
SELECT c.client_id, SUM(o.order_price)::numeric AS total_spent 
FROM client c 
left join orders o 
on c.client_id = o.client_id 
group by c.client_id 
having SUM(o.order_price)::numeric > ${number}`;
