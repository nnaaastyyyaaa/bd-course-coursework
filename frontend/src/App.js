import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />
      {user && <p>Вітаємо, {user.client_name}</p>}

      <Routes>
        <Route
          path="/products"
          element={<Products cart={cart} setCart={setCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/register" element={<Register user={user} />} />
        <Route
          path="/login"
          element={<Login onLogin={setUser} user={user} />}
        />
        <Route path="*" element={<Products cart={cart} setCart={setCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
