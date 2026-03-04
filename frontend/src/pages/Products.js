import { useState, useEffect } from "react";

const API_PRODUCTS = "http://localhost:5001/api/products";

export default function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(API_PRODUCTS);
      const data = await res.json();
      setProducts(data.data || data);
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div>
      <h2>Продукти</h2>
      {Array.isArray(products) &&
        products.map((p) => (
          <div
            key={p.product_id || p.id}
            style={{
              background: "white",
              borderRadius: 10,
              padding: 12,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              marginBottom: 10,
            }}
          >
            <strong>{p.product_name || p.name}</strong>
            <p>{p.description}</p>
            <p>Ціна: {p.price}</p>
            <button onClick={() => addToCart(p)}>Додати в кошик</button>
          </div>
        ))}
    </div>
  );
}
