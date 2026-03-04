import { useState, useEffect } from "react";

export default function Cart({ cart, setCart }) {
  const remove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div
      style={{
        background: "white",
        padding: 12,
        borderRadius: 10,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Кошик</h2>
      <ul>
        {cart.map((item, i) => (
          <li key={i}>
            {item.product_name || item.name} — {item.price}
            <button onClick={() => remove(i)}>Видалити</button>
          </li>
        ))}
      </ul>
      <h3>Всього: {total}</h3>
    </div>
  );
}
