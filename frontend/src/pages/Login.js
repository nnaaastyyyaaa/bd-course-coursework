import { useState } from "react";

export default function Login({ onLogin, user }) {
  const [form, setForm] = useState({
    email: "",
    phone_number: "",
  });
  const [message, setMessage] = useState("");
  if (user) {
    return <p>Ви вже увійшли як {user.client_name}</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/users");
    const users = await res.json();
    const user = users.data.find(
      (u) => u.email === form.email && u.phone_number === form.phone_number,
    );

    if (!user) {
      setMessage("Невірний email або пароль");
      return;
    }

    setMessage("Вхід успішний!");
    onLogin(user);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Вхід</h2>
      <form
        onSubmit={login}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone_number"
          type="phone_number"
          placeholder="Пароль"
          value={form.phone_number}
          onChange={handleChange}
        />
        <button type="submit">Увійти</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
