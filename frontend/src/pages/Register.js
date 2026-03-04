import { useState } from "react";

export default function Register({ user }) {
  const [form, setForm] = useState({
    client_name: "",
    last_name: "",
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

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/users/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.error) {
      setMessage(data.error);
    } else {
      setMessage("Реєстрація успішна!");
      setForm({ client_name: "", last_name: "", email: "", phone_number: "" });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Реєстрація</h2>
      <form
        onSubmit={register}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <input
          name="client_name"
          placeholder="Ім'я"
          value={form.client_name}
          onChange={handleChange}
        />
        <input
          name="last_name"
          placeholder="Ім'я"
          value={form.last_name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone_number"
          placeholder="Номер телефону"
          value={form.phone_number}
          onChange={handleChange}
        />
        <button type="submit">Зареєструватись</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
